import useToast from "@/hooks/use-toast";
import { useState } from "react";
import useProgram from "./use-program";
import reportHash from "@/utils/report-hash";
import {
  getPool,
  getState,
  getBuyState,
  loadSbProgram,
  setupQueue,
  getAssociatedTokenAddress,
  getBidGasFee,
  getWrapToSolIx
} from "./helpers";
import * as anchor from "@coral-xyz/anchor";
import { useSolanaWallets } from "@privy-io/react-auth";
import { BASE_TOKEN, QUOTE_TOKEN } from "@/config/btc";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import {
  PublicKey,
  Transaction,
  TransactionInstruction
} from "@solana/web3.js";
import { Randomness } from "@switchboard-xyz/on-demand";
import { sendSolanaTransaction } from "@/utils/transaction/send-transaction";
import axiosInstance from "@/libs/axios";

export default function useBid(onSuccess: (isWinner: boolean) => void) {
  const [bidding, setBidding] = useState(false);
  const toast = useToast();
  const { wallets } = useSolanaWallets();
  const { program, provider } = useProgram();

  const onBid = async (poolId: number, times: number) => {
    if (!wallets.length) {
      toast.fail({ title: "Please connect your wallet" });
      return;
    }
    if (!provider) {
      toast.fail({ title: "Provider not available" });
      return;
    }
    const payer = wallets[0];
    setBidding(true);
    try {
      const state = getState(program);
      // Use the actual poolId parameter instead of hardcoded value
      const poolIdBN = new anchor.BN(poolId);
      console.log("Using poolId:", poolId, "as BN:", poolIdBN.toString());
      const pool = await getPool(program, provider, state.pda, poolIdBN);
      const buyerState = await getBuyState(
        program,
        provider,
        pool.pda,
        new PublicKey(payer.address)
      );
      const sbProgram = await loadSbProgram(provider);
      const randomnessAccountResult = await axiosInstance.get(
        `/api/v1/paygas/sol/randomnessaccount`
      );

      const randomnessAccount = randomnessAccountResult.data.data;
      console.log("randomnessAccount", randomnessAccount);
      if (!randomnessAccount) {
        toast.fail({ title: "Randomness account not found" });
        return;
      }

      const sbQueue = await setupQueue(program);

      let randomnessCreateIx;

      const randomness = new Randomness(
        // @ts-ignore
        sbProgram,
        new PublicKey(randomnessAccount)
      );
      const commitIx = await randomness.commitIx(
        sbQueue,
        new PublicKey(import.meta.env.VITE_SOLANA_OPERATOR)
      );
      randomnessCreateIx = [commitIx];

      const userQuoteAccount = await getAssociatedTokenAddress(
        new PublicKey(QUOTE_TOKEN.address),
        new PublicKey(payer.address),
        provider
      );

      const poolQuoteAccount = await getAssociatedTokenAddress(
        new PublicKey(QUOTE_TOKEN.address),
        new PublicKey(pool.pda.toString()),
        provider
      );
      const protocolQuoteAccount = await getAssociatedTokenAddress(
        new PublicKey(QUOTE_TOKEN.address),
        new PublicKey(state.pda.toString()),
        provider
      );

      const userPaidAccount = await getAssociatedTokenAddress(
        new PublicKey(QUOTE_TOKEN.address),
        new PublicKey(payer.address),
        provider
      );
      const operatorPaidAccount = await getAssociatedTokenAddress(
        new PublicKey(QUOTE_TOKEN.address),
        new PublicKey(import.meta.env.VITE_SOLANA_OPERATOR),
        provider
      );

      const gasFee = await getBidGasFee(
        program,
        state.pda,
        QUOTE_TOKEN.address
      );
      let quoteAmount = times * 10 ** QUOTE_TOKEN.decimals;
      if (QUOTE_TOKEN.address === BASE_TOKEN.address) {
        quoteAmount = quoteAmount + gasFee.toNumber();
      }

      let wrapTx: any[] = [];
      if (
        QUOTE_TOKEN.address.toString() ==
        "So11111111111111111111111111111111111111112"
      ) {
        wrapTx = getWrapToSolIx(payer, userQuoteAccount, quoteAmount);
      }

      let bidAccounts = {
        dollaState: state.pda,
        poolState: pool.pda,
        buyerState: buyerState.pda,
        randomnessAccount: new PublicKey(randomnessAccount),
        quoteMint: new PublicKey(QUOTE_TOKEN.address),
        paidMint: new PublicKey(QUOTE_TOKEN.address),
        protocolQuoteAccount: protocolQuoteAccount?.address,
        userQuoteAccount: userQuoteAccount?.address,
        poolQuoteAccount: poolQuoteAccount?.address,
        userPaidAccount: userPaidAccount?.address,
        operatorPaidAccount: operatorPaidAccount?.address,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        user: new PublicKey(payer.address),
        operator: new PublicKey(import.meta.env.VITE_SOLANA_OPERATOR),
        systemProgram: anchor.web3.SystemProgram.programId
      };

      const bidIx: TransactionInstruction = await program.methods
        .bid(times)
        // @ts-ignore
        .accounts(bidAccounts)
        .instruction();

      const tx = new Transaction();
      for (let i = 0; i < wrapTx.length; i++) {
        tx.add(wrapTx[i]);
      }

      if (userQuoteAccount?.instruction) {
        tx.add(userQuoteAccount.instruction);
      }
      if (poolQuoteAccount?.instruction) {
        tx.add(poolQuoteAccount.instruction);
      }
      if (protocolQuoteAccount?.instruction) {
        tx.add(protocolQuoteAccount.instruction);
      }
      if (userPaidAccount?.instruction) {
        tx.add(userPaidAccount.instruction);
      }
      if (operatorPaidAccount?.instruction) {
        tx.add(operatorPaidAccount.instruction);
      }
      for (let i = 0; i < randomnessCreateIx.length; i++) {
        console.log("randomnessCreateIx:" + randomnessCreateIx[i].programId);
        tx.add(randomnessCreateIx[i]);
      }
      tx.add(bidIx);
      tx.feePayer = new PublicKey(import.meta.env.VITE_SOLANA_OPERATOR);

      // Get the latest blockhash
      const { blockhash } = await provider.connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;

      const simulationResult = await provider.connection.simulateTransaction(
        tx
      );
      console.log("bid:", simulationResult);

      // const receipt = await sendTransaction({
      //   transaction: tx,
      //   connection: provider.connection
      // });
      const result = await sendSolanaTransaction(tx, "bid");
      console.log("receipt:", result);
      // Report hash for tracking
      reportHash({
        chain: "solana",
        user: payer.address,
        hash: result.data.data.hash,
        block_number: blockhash
      });

      toast.success({ title: "Bid placed successfully!" });
      onSuccess(false);
      // const pb = new PublicKey("7qKtiPPkK1ZYqVFujVJjsTuGSJNXAvVhLj41HxtQDsTG");
      // const userBaseAccount = await getAssociatedTokenAddress(
      //   new PublicKey(BASE_TOKEN.address),
      //   new PublicKey(payer.address),
      //   provider
      // );

      // const poolBaseAccount = await getAssociatedTokenAddress(
      //   new PublicKey(BASE_TOKEN.address),
      //   new PublicKey(pool.pda.toString()),
      //   provider
      // );
      // let settleBidAccounts = {
      //   dollaState: state.pda,
      //   poolState: pool.pda,
      //   user: new PublicKey(payer.address),
      //   buyerState: buyerState.pda,
      //   randomnessAccount: pb,
      //   baseMint: new PublicKey(BASE_TOKEN.address),
      //   quoteMint: new PublicKey(QUOTE_TOKEN.address),
      //   userBaseAccount: userBaseAccount?.address,
      //   poolBaseAccount: poolBaseAccount?.address,
      //   userQuoteAccount: userQuoteAccount?.address,
      //   poolQuoteAccount: poolQuoteAccount?.address,
      //   tokenProgram: TOKEN_PROGRAM_ID,
      //   associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      //   operator: new PublicKey(import.meta.env.VITE_SOLANA_OPERATOR),
      //   systemProgram: anchor.web3.SystemProgram.programId
      // };
      // console.log("userBaseAccount:", userPaidAccount?.address.toString());
      // console.log("settleBidAccounts:", settleBidAccounts);
      // const settleBidIx: TransactionInstruction = await program.methods
      //   .settleBid()
      //   .accounts(settleBidAccounts)
      //   .instruction();

      // const randomness = new Randomness(sbProgram, pb);
      // console.log("randomness", randomness);
      // const revealIx = await randomness.revealIx();
      // console.log("revealIx", revealIx);
      // const settleTx = new Transaction().add(revealIx).add(settleBidIx);

      // settleTx.feePayer = new PublicKey(import.meta.env.VITE_SOLANA_OPERATOR);

      // settleTx.recentBlockhash = blockhash;

      // const settleSimulationResult =
      //   await provider.connection.simulateTransaction(settleTx);
      // console.log("settle:", settleSimulationResult);
      // const settleReceipt = await sendTransaction({
      //   transaction: settleTx,
      //   connection: provider.connection
      // });
      // console.log("settleReceipt:", settleReceipt);
    } catch (error) {
      console.error("Bid error:", error);
      toast.fail({
        title: "Bid failed",
        description:
          error instanceof Error ? error.message : "Unknown error occurred"
      });
    } finally {
      setBidding(false);
    }
  };
  return {
    bidding,
    onBid
  };
}
