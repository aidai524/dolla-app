import useToast from "@/hooks/use-toast";
import { useState } from "react";
import { ethers } from "ethers";
import useProgram from "./use-program";
import reportHash from "@/utils/report-hash";
import {
  getNextOrderId,
  getPool,
  getState,
  getBuyState,
  loadSbProgram,
  getRandomnessAccount,
  setupQueue,
  accountExists,
  getAssociatedTokenAddress,
  getBidGasFee,
  getWrapToSolIx,
  BrowserRandomness
} from "./helpers";
import * as anchor from "@coral-xyz/anchor";
import { useSolanaWallets } from "@privy-io/react-auth";
// Browser-only implementation - Switchboard not available in browser
// import { Randomness } from "@switchboard-xyz/on-demand";
import { BASE_TOKEN, QUOTE_TOKEN } from "@/config/btc";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import { Transaction, TransactionInstruction } from "@solana/web3.js";

export default function useBid(onSuccess: (isWinner: boolean) => void) {
  const [bidding, setBidding] = useState(false);
  const toast = useToast();
  const { wallets } = useSolanaWallets();
  const { program, provider } = useProgram();

  const onBid = async (poolId: number, times: number) => {
    if (poolId === -1 || !wallets.length || !provider) {
      return;
    }
    const payer = wallets[0];
    setBidding(true);
    try {
      const state = getState(program);
      let nextOrderId = await getNextOrderId(program, provider, state.pda);
      nextOrderId = new anchor.BN(nextOrderId);

      const pool = await getPool(program, provider, state.pda, nextOrderId);
      const buyerState = await getBuyState(
        program,
        provider,
        pool.pda,
        provider.publicKey
      );
      const sbProgram = await loadSbProgram(provider);
      const randomnessAccount = getRandomnessAccount(
        import.meta.env.VITE_SOLANA_OPERATOR
      );

      const sbQueue = await setupQueue(program);
      let randomnessCreateIx: any[] = [];
      let singers: any[] = [];

      // Use browser-compatible randomness implementation
      console.log("Using browser-compatible randomness");
      const [randomness, createIx] = await BrowserRandomness.create(
        sbProgram,
        randomnessAccount,
        sbQueue,
        import.meta.env.VITE_SOLANA_OPERATOR
      );
      const commitIx = await randomness.commitIx(
        sbQueue,
        import.meta.env.VITE_SOLANA_OPERATOR
      );
      randomnessCreateIx = [createIx, commitIx];
      singers = [wallets[0].address, randomnessAccount];
      const userQuoteAccount = await getAssociatedTokenAddress(
        QUOTE_TOKEN.address,
        payer.address,
        provider
      );
      console.log("before poolBaseAccount pool.pda:" + pool.pda.toString());
      const poolQuoteAccount = await getAssociatedTokenAddress(
        QUOTE_TOKEN.address,
        pool.pool.quoteToken,
        provider
      );
      const protocolQuoteAccount = await getAssociatedTokenAddress(
        QUOTE_TOKEN.address,
        provider.publicKey,
        provider
      );

      const userPaidAccount = await getAssociatedTokenAddress(
        QUOTE_TOKEN.address,
        payer.address,
        provider
      );
      const operatorPaidAccount = await getAssociatedTokenAddress(
        QUOTE_TOKEN.address,
        import.meta.env.VITE_SOLANA_OPERATOR,
        provider
      );

      const gasFee = await getBidGasFee(
        program,
        state.pda,
        QUOTE_TOKEN.address
      );
      let quoteAmount = times * 10 ** QUOTE_TOKEN.decimals;
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
        randomnessAccount:
          randomnessAccount?.publicKey ||
          new anchor.web3.PublicKey("11111111111111111111111111111111"),
        quoteMint: BASE_TOKEN.address,
        paidMint: QUOTE_TOKEN.address,
        protocolQuoteAccount: protocolQuoteAccount?.address,
        userQuoteAccount: userQuoteAccount?.address,
        poolQuoteAccount: poolQuoteAccount?.address,
        userPaidAccount: userPaidAccount?.address,
        operatorPaidAccount: operatorPaidAccount?.address,

        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        user: payer.address,
        operator: import.meta.env.VITE_SOLANA_OPERATOR,
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
      tx.add(bidIx);

      // const receipt = await tx.wait();
      // console.log("receipt", receipt);
      // reportHash(receipt.transactionHash, receipt.blockNumber);
      // if (receipt.status === 0) {
      //   toast.fail({ title: "Draw failed" });
      //   return;
      // }

      // const afterPoolState = await BettingContract.getPoolState(poolId);
      // onSuccess(
      //   afterPoolState.winner !== "0x0000000000000000000000000000000000000000"
      // );
      // toast.success({
      //   title:
      //     afterPoolState.winner !== "0x0000000000000000000000000000000000000000"
      //       ? "You are the winner"
      //       : "Draw success"
      // });
    } catch (error) {
      console.error(error);
    } finally {
      setBidding(false);
    }
  };
  return {
    bidding,
    onBid
  };
}
