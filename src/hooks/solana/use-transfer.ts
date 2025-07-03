import { useCallback, useState } from "react";
import { QUOTE_TOKEN } from "@/config/btc";
import useToast from "@/hooks/use-toast";
import reportHash from "@/utils/report-hash";
import * as anchor from "@coral-xyz/anchor";
import useProgram from "./use-program";
import { getState, getAssociatedTokenAddress } from "./helpers";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import { useSolanaWallets } from "@privy-io/react-auth";
import {
  PublicKey,
  Transaction,
  TransactionInstruction
} from "@solana/web3.js";
import { sendSolanaTransaction } from "@/utils/transaction/send-transaction";

export default function useTransfer({
  token,
  onTransferSuccess
}: {
  token: any;
  onTransferSuccess?: () => void;
}) {
  const [transferring, setTransferring] = useState(false);
  const { wallets } = useSolanaWallets();
  const toast = useToast();
  const { program, provider } = useProgram();

  const onTransfer = useCallback(
    async (amount: number, to: string) => {
      if (!wallets.length || !amount) {
        toast.fail({ title: "Please connect your wallet" });
        return;
      }
      const payer = wallets[0];
      try {
        setTransferring(true);
        const transferAmount = new anchor.BN(amount * 10 ** token.decimals);
        const state = getState(program);

        const userTokenAccount = await getAssociatedTokenAddress(
          new PublicKey(token.address),
          new PublicKey(payer.address),
          provider
        );

        const toTokenAccount = await getAssociatedTokenAddress(
          new PublicKey(token.address),
          new PublicKey(to),
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

        let transferAccounts = {
          dollaState: state.pda,
          tokenMint: new PublicKey(token.address),
          paidMint: new PublicKey(token.address),
          userTokenAccount: userTokenAccount?.address,
          toTokenAccount: toTokenAccount?.address,
          userPaidAccount: userPaidAccount?.address,
          operatorPaidAccount: operatorPaidAccount?.address,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          user: new PublicKey(payer.address),
          toUser: new PublicKey(to),
          operator: new PublicKey(import.meta.env.VITE_SOLANA_OPERATOR),
          systemProgram: anchor.web3.SystemProgram.programId
        };
        const tx: TransactionInstruction = await program.methods
          .transferHelper(transferAmount)
          .accounts(transferAccounts)
          .instruction();
        const batchTx = new Transaction().add(tx);
        batchTx.feePayer = new PublicKey(import.meta.env.VITE_SOLANA_OPERATOR);
        // Get the latest blockhash
        const { blockhash } = await provider.connection.getLatestBlockhash();
        batchTx.recentBlockhash = blockhash;

        const result = await sendSolanaTransaction(tx, "transferHelper");
        console.log("receipt:", result);
        // Report hash for tracking
        reportHash({
          chain: "solana",
          user: payer.address,
          hash: result.data.data.hash,
          block_number: blockhash
        });

        onTransferSuccess?.();
      } catch (error) {
        console.error("Create error:", error);
        throw error;
      } finally {
        setTransferring(false);
      }
    },
    [token]
  );

  return {
    transferring,
    onTransfer
  };
}
