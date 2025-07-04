import { useState, useEffect } from "react";
import useBettingContract from "@/hooks/evm/use-betting-contract";
import useToast from "@/hooks/use-toast";
import reportHash from "@/utils/report-hash";
import useGelatonetwork from "./use-gelatonetwork";

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
  const { executeTransaction } = useGelatonetwork();
  const cancelOrder = async () => {
    if (!BettingContract) {
      return;
    }
    try {
      setCancelling(true);
      const tx = await BettingContract.populateTransaction.cancelActivity(
        poolId
      );
      executeTransaction({
        calls: [tx],
        onSuccess: async (receipt: any) => {
          setCancelling(false);
          if (receipt?.status === 0) {
            toast.fail({ title: "Cancel order failed" });
          } else {
            toast.success({ title: "Cancel order success" });
            onSuccess();
          }

          reportHash({
            hash: receipt.transactionHash,
            block_number: receipt.blockNumber,
            chain: "Berachain",
            user: receipt?.from
          });
        },
        onError: () => {
          setCancelling(false);
          toast.fail({ title: "Cancel order failed" });
        }
      });
    } catch (error) {
      console.error("Cancel error:", error);
      toast.fail({ title: "Cancel order failed" });
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
