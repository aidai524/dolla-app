import { useState } from "react";
import useToast from "@/hooks/use-toast";
import useBettingContract from "./use-betting-contract";
import reportHash from "@/utils/report-hash";

export default function useDeposit(
  poolId: number,
  onSuccess?: () => void,
  account?: string
) {
  const [depositing, setDepositing] = useState(false);
  const toast = useToast();
  const BettingContract = useBettingContract(account);

  const onDeposit = async () => {
    if (poolId === -1) {
      toast.fail({ title: "Please create pool first" });
      return;
    }
    if (!BettingContract) {
      return;
    }
    setDepositing(true);
    try {
      // Get pool state
      const poolState = await BettingContract.getPoolState(poolId);
      console.log("Pool state:", poolState);

      // Get pool configuration
      const poolConfig = await BettingContract.getConfig(poolId);
      console.log("Pool config:", poolConfig);

      if (poolState.isRewardDeposited) {
        toast.fail({ title: "Reward already deposited" });
        return;
      }
      const tx = await BettingContract.depositReward(poolId);
      console.log("Transaction sent:", tx.hash);

      const receipt = await tx.wait();
      console.log("Transaction receipt:", receipt);
      reportHash(receipt.transactionHash, receipt.blockNumber);
      if (receipt.status === 0) {
        toast.fail({ title: "Deposit failed" });
        throw new Error("Deposit failed");
      }

      toast.success({ title: "Deposit success" });
      onSuccess?.();
    } catch (error: any) {
      console.error("Deposit error details:", {
        message: error.message,
        code: error.code,
        data: error.data,
        transaction: error.transaction
      });

      // Show more specific error message
      let errorMessage = "Deposit failed";
      if (error.message) {
        if (error.message.includes("insufficient funds")) {
          errorMessage = "Insufficient funds for deposit";
        } else if (error.message.includes("user rejected")) {
          errorMessage = "Transaction rejected by user";
        } else if (error.message.includes("already deposited")) {
          errorMessage = "Reward already deposited";
        }
      }

      toast.fail({ title: errorMessage });
    } finally {
      setDepositing(false);
    }
  };

  return { depositing, onDeposit };
}
