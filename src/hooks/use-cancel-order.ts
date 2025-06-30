import { useState, useEffect } from "react";
import useBettingContract from "@/hooks/use-betting-contract";
import useToast from "@/hooks/use-toast";
import reportHash from "@/utils/report-hash";

export default function useCancelOrder({
  poolId,
  onSuccess
}: {
  poolId: number;
  onSuccess: () => void;
}) {
  const [cancelling, setCancelling] = useState(false);
  const [penalty, setPenalty] = useState("");
  const [loading, setLoading] = useState(false);
  const BettingContract = useBettingContract();
  const toast = useToast();

  const cancelOrder = async () => {
    if (!BettingContract) {
      return;
    }
    try {
      setCancelling(true);
      const tx = await BettingContract.cancelActivity(poolId);
      const receipt = await tx.wait();
      console.log("receipt", receipt);
      reportHash({
        hash: receipt.transactionHash,
        block_number: receipt.blockNumber,
        chain: "Berachain",
        user: receipt?.from
      });
      if (receipt.status === 0) {
        toast.fail({ title: "Cancel order failed" });
        return;
      }
      toast.success({ title: "Cancel order success" });
      onSuccess();
    } catch (error) {
      console.error("Cancel error:", error);
      toast.fail({ title: "Cancel order failed" });
      throw error;
    } finally {
      setCancelling(false);
    }
  };

  const getPenalty = async () => {
    try {
      setLoading(true);
      const penalty = await BettingContract.getPenalty(poolId);
      console.log("penalty", penalty.toString());
      setPenalty(penalty.toString());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (BettingContract && poolId !== -1) {
      getPenalty();
    }
  }, [BettingContract, poolId]);

  return { cancelling, cancelOrder, penalty, loading };
}
