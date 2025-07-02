import { useState } from "react";
import { BASE_TOKEN, QUOTE_TOKEN } from "@/config/btc";
import useToast from "@/hooks/use-toast";
import reportHash from "@/utils/report-hash";
import * as anchor from "@coral-xyz/anchor";
import useProgram from "./use-program";
import {
  getState,
  getNextOrderId,
  getPool,
  getAssociatedTokenAddress,
  getWrapToSolIx
} from "./helpers";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import { useSolanaWallets } from "@privy-io/react-auth";
import {
  useSignTransaction,
  useSendTransaction
} from "@privy-io/react-auth/solana";
import {
  PublicKey,
  Transaction,
  TransactionInstruction
} from "@solana/web3.js";
import { sendSolanaTransaction } from "@/utils/transaction/send-transaction";

export default function useCancel({
  onCancelSuccess
}: {
  onCancelSuccess?: () => void;
}) {
  const [canceling, setCanceling] = useState(false);
  const { wallets } = useSolanaWallets();
  const toast = useToast();
  const { program, provider } = useProgram();
  const { signTransaction } = useSignTransaction();
  const { sendTransaction } = useSendTransaction();
  const onCancel = async (orderId: number) => {
    if (!wallets.length || !orderId) {
      toast.fail({ title: "Please connect your wallet" });
      return;
    }
    const payer = wallets[0];
    try {
      setCanceling(true);
      const state = getState(program);

      const pool = await getPool(program, provider, state.pda, orderId);

      const userBaseAccount = await getAssociatedTokenAddress(
        new PublicKey(BASE_TOKEN.address),
        new PublicKey(payer.address),
        provider
      );

      const userQuoteAccount = await getAssociatedTokenAddress(
        new PublicKey(QUOTE_TOKEN.address),
        new PublicKey(payer.address),
        provider
      );

      const poolBaseAccount = await getAssociatedTokenAddress(
        new PublicKey(BASE_TOKEN.address),
        new PublicKey(pool.pda.toString()),
        provider
      );

      const poolQuoteAccount = await getAssociatedTokenAddress(
        new PublicKey(QUOTE_TOKEN.address),
        new PublicKey(pool.pda.toString()),
        provider
      );

      let wrapTx: any[] = [];
      if (
        BASE_TOKEN.address.toString() ==
        "So11111111111111111111111111111111111111112"
      ) {
        wrapTx = getWrapToSolIx(payer, userBaseAccount, 100000000);
      }

      let cancelPoolAccounts = {
        dollaState: state.pda,
        poolState: pool.pda,
        baseMint: new PublicKey(BASE_TOKEN.address),
        quoteMint: new PublicKey(QUOTE_TOKEN.address),
        userBaseAccount: userBaseAccount?.address,
        userQuoteAccount: userQuoteAccount?.address,
        poolBaseAccount: poolBaseAccount?.address,
        poolQuoteAccount: poolQuoteAccount?.address,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        user: new PublicKey(payer.address),
        systemProgram: anchor.web3.SystemProgram.programId
      };
      const tx: TransactionInstruction = await program.methods
        .cancelPool()
        .accounts(cancelPoolAccounts)
        .instruction();
      const batchTx = new Transaction().add(...wrapTx).add(tx);
      batchTx.feePayer = new PublicKey(import.meta.env.VITE_SOLANA_OPERATOR);
      // Get the latest blockhash
      const { blockhash } = await provider.connection.getLatestBlockhash();
      batchTx.recentBlockhash = blockhash;

      // const signedTx = await signTransaction({
      //   transaction: tx,
      //   connection: provider.connection
      // });

      // const receipt = await sendTransaction({
      //   transaction: batchTx,
      //   connection: provider.connection
      // });

      const result = await sendSolanaTransaction(tx);
      console.log("receipt:", result);
      // Report hash for tracking
      reportHash({
        chain: "solana",
        user: payer.address,
        hash: result.data.data.hash,
        block_number: blockhash
      });

      onCancelSuccess?.();
    } catch (error) {
      console.error("Create error:", error);
      throw error;
    } finally {
      setCanceling(false);
    }
  };

  return {
    canceling,
    onCancel
  };
}
