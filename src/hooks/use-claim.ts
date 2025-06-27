import { useState } from "react";
import useBettingContract from "./use-betting-contract";
import useToast from "@/hooks/use-toast";

export default function useClaim(poolIds: number[], onSuccess?: () => void) {
  const [claiming, setClaiming] = useState(false);
  const toast = useToast();
  const BettingContract = useBettingContract();

  const claim = async () => {
    if (!BettingContract) {
      return;
    }
    try {
      setClaiming(true);
      const _poolIds = Array.isArray(poolIds) ? poolIds : [poolIds];
      const tx = await BettingContract.batchExtractCreatorFunds(_poolIds);
      const receipt = await tx.wait();
      console.log("receipt", receipt);
      if (receipt.status === 0) {
        toast.fail({ title: "Claim failed" });
        throw new Error("Claim failed");
      }
      toast.success({ title: "Claim success" });
      onSuccess?.();
    } catch (error) {
      console.error("Claim error:", error);
      toast.fail({ title: "Claim failed" });
      throw error;
    } finally {
      setClaiming(false);
    }
  };

  return { claiming, claim };
}
