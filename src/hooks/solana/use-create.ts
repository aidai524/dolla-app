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
import { Transaction, TransactionInstruction } from "@solana/web3.js";

export default function useCreate({
  amount,
  anchorPrice,
  onCreateSuccess
}: {
  token: any;
  amount: number;
  anchorPrice: number;
  onCreateSuccess?: (poolId: number) => void;
}) {
  const [creating, setCreating] = useState(false);
  const { wallets } = useSolanaWallets();
  const toast = useToast();
  const { program, provider } = useProgram();
  const onCreate = async () => {
    if (!wallets.length) {
      toast.fail({ title: "Please connect your wallet" });
      return;
    }
    const payer = wallets[0];
    try {
      setCreating(true);
      const state = getState(program);
      let baseAmount = new anchor.BN(amount * 10 ** BASE_TOKEN.decimals);
      let expectedQuoteAmount = new anchor.BN(
        anchorPrice * 10 ** QUOTE_TOKEN.decimals
      );
      let nextOrderId = await getNextOrderId(program, provider, state.pda);
      nextOrderId = new anchor.BN(nextOrderId);
      const pool = await getPool(program, provider, state.pda, nextOrderId);

      const userBaseAccount = await getAssociatedTokenAddress(
        BASE_TOKEN.address,
        provider.publicKey!,
        provider
      );

      const poolBaseAccount = await getAssociatedTokenAddress(
        BASE_TOKEN.address,
        pool.pool.baseToken,
        provider
      );

      let createPoolAccounts = {
        dollaState: state.pda,
        poolState: pool.pda,
        baseMint: baseAmount,
        quoteMint: expectedQuoteAmount,
        userBaseAccount: userBaseAccount?.address,
        poolBaseAccount: poolBaseAccount?.address,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        user: payer.address,
        systemProgram: anchor.web3.SystemProgram.programId,
        operator: import.meta.env.VITE_SOLANA_OPERATOR
      };
      const createIx: TransactionInstruction = await program.methods
        .createPool({
          baseAmount: baseAmount,
          expectedQuoteAmount: expectedQuoteAmount
        })
        .accounts(createPoolAccounts as any)
        .instruction();
      let wrapTx: any[] = [];
      if (
        BASE_TOKEN.address.toString() ==
        "So11111111111111111111111111111111111111112"
      ) {
        wrapTx = getWrapToSolIx(payer, userBaseAccount, expectedQuoteAmount);
      }

      const tx = new Transaction();
      for (let i = 0; i < wrapTx.length; i++) {
        tx.add(wrapTx[i]);
      }
      if (userBaseAccount?.instruction) {
        tx.add(userBaseAccount.instruction);
      }
      if (poolBaseAccount?.instruction) {
        tx.add(poolBaseAccount.instruction);
      }
      tx.add(createIx);
      tx.feePayer = import.meta.env.VITE_SOLANA_OPERATOR;
      // reportHash(receipt.transactionHash, receipt.blockNumber);
      // if (receipt.status === 0) {
      //   toast.fail({ title: "Create pool failed" });
      //   throw new Error("Create pool failed");
      // }

      // toast.success({ title: "Create pool success" });
      // const poolId = receipt.logs[0].topics[1];
      // onCreateSuccess?.(Number(poolId));
    } catch (error) {
      console.error("Create error:", error);
      throw error;
    } finally {
      setCreating(false);
    }
  };

  return {
    creating,
    onCreate
  };
}
