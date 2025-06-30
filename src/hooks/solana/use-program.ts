import dollaAbi from "@/config/abis/dolla-solana";
import { useMemo } from "react";
import * as anchor from "@coral-xyz/anchor";

export default function useProgram() {
  return useMemo(() => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    const program = new anchor.Program(dollaAbi, provider);

    return {
      program,
      provider
    };
  }, []);
}
