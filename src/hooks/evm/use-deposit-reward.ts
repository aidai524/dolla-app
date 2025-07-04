import { useState } from "react";
import useToast from "@/hooks/use-toast";
import useBettingContract from "./use-betting-contract";
import reportHash from "@/utils/report-hash";
import useGelatonetwork from "./use-gelatonetwork";

export default function useDeposit(
  poolId: number,
  onSuccess?: () => void,
  account?: string
) {
  const [depositing, setDepositing] = useState(false);
  const toast = useToast();
  const BettingContract = useBettingContract(account);
  const { executeTransaction } = useGelatonetwork();

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
      const tx = await BettingContract.populateTransaction.depositReward(
        poolId
      );
      console.log("Transaction sent:", tx.hash);

      executeTransaction({
        calls: [tx],
        onSuccess: (receipt: any) => {
          console.log("receipt", receipt);
          setDepositing(false);
          if (receipt?.status === 0) {
            toast.fail({ title: "Deposit failed" });
          } else {
            toast.success({ title: "Deposit success" });
            onSuccess?.();
          }
          reportHash({
            hash: receipt.transactionHash,
            block_number: receipt.blockNumber,
            chain: "Berachain",
            user: receipt?.from
          });
        },
        onError: () => {
          toast.fail({ title: "Deposit failed" });
          setDepositing(false);
          throw new Error("Deposit failed");
        }
      });
    } catch (error: any) {
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
      setDepositing(false);
      toast.fail({ title: errorMessage });
    }
  };

  return { depositing, onDeposit };
}
