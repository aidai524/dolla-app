import dollaAbi from "@/config/abis/dolla-solana";
import { useMemo } from "react";
import * as anchor from "@coral-xyz/anchor";
import { useSolanaWallets } from "@privy-io/react-auth";
import { Connection, clusterApiUrl } from "@solana/web3.js";

export default function useProgram() {
  const { wallets } = useSolanaWallets();

  return useMemo(() => {
    // Browser-compatible provider setup
    if (typeof window === "undefined" || !wallets.length) {
      // Return mock objects when not in browser or no wallet connected
      const mockProvider = {
        connection: new Connection(clusterApiUrl("devnet")),
        publicKey: null,
        signTransaction: () => Promise.resolve(),
        signAllTransactions: () => Promise.resolve([])
      } as any;

      const mockProgram = {
        programId: new anchor.web3.PublicKey(
          "11111111111111111111111111111111"
        ),
        provider: mockProvider,
        methods: {}
      } as any;

      return {
        program: mockProgram,
        provider: mockProvider
      };
    }

    // Use wallet connection for browser environment
    const wallet = wallets[0];
    const connection = new Connection(clusterApiUrl("devnet"));

    const provider = new anchor.AnchorProvider(
      connection,
      {
        publicKey: new anchor.web3.PublicKey(wallet.address),
        signTransaction: wallet.signTransaction,
        signAllTransactions: wallet.signAllTransactions
      },
      { commitment: "confirmed" }
    );

    anchor.setProvider(provider);
    // @ts-ignore
    const program = new anchor.Program(dollaAbi, provider);

    return {
      program,
      provider
    };
  }, [wallets]);
}
