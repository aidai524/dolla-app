import { useState } from "react";
import { QUOTE_TOKEN } from "@/config/btc";
import useToast from "@/hooks/use-toast";
import reportHash from "@/utils/report-hash";
import * as anchor from "@coral-xyz/anchor";
import useProgram from "./use-program";
import { getState, getPool, getAccountsInfo } from "./helpers";
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
import { sendSolanaTransaction } from "@/utils/transaction/send-solana-transaction";

export default function useClaimFunds({
  onClaimSuccess
}: {
  onClaimSuccess?: () => void;
}) {
  const [claiming, setClaiming] = useState(false);
  const { wallets } = useSolanaWallets();
  const toast = useToast();
  const { program, provider } = useProgram();
  const onClaim = async (orderId: number) => {
    if (!wallets.length || !orderId) {
      toast.fail({ title: "Please connect your wallet" });
      return;
    }
    const payer = wallets[0];
    try {
      setClaiming(true);
      const state = getState(program);

      const pool = await getPool(program, provider, state.pda, orderId);

      const [userQuoteAccount, poolQuoteAccount] = await getAccountsInfo([
        [QUOTE_TOKEN.address, payer.address],
        [QUOTE_TOKEN.address, pool.pda.toString()]
      ]);

      let claimFundsAccounts = {
        dollaState: state.pda,
        poolState: pool.pda,
        quoteMint: new PublicKey(QUOTE_TOKEN.address),
        userQuoteAccount: userQuoteAccount?.address,
        poolQuoteAccount: poolQuoteAccount?.address,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        user: new PublicKey(payer.address),
        systemProgram: anchor.web3.SystemProgram.programId
      };
      const tx: TransactionInstruction = await program.methods
        .claimFunds()
        .accounts(claimFundsAccounts)
        .instruction();
      const batchTx = new Transaction().add(tx);
      batchTx.feePayer = new PublicKey(import.meta.env.VITE_SOLANA_OPERATOR);
      // Get the latest blockhash
      batchTx.recentBlockhash = "11111111111111111111111111111111";

      // const signedTx = await signTransaction({
      //   transaction: tx,
      //   connection: provider.connection
      // });

      // const receipt = await sendTransaction({
      //   transaction: batchTx,
      //   connection: provider.connection
      // });
      const result = await sendSolanaTransaction(batchTx, "claimFunds");
      console.log("receipt:", result);
      // Report hash for tracking
      const slot = await provider.connection.getSlot();
      reportHash({
        chain: "solana",
        user: payer.address,
        hash: result.data.data.hash,
        block_number: slot
      });

      onClaimSuccess?.();
    } catch (error) {
      console.error("Create error:", error);
      throw error;
    } finally {
      setClaiming(false);
    }
  };

  return {
    claiming,
    onClaim
  };
}
