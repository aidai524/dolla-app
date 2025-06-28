import useToast from "./use-toast";
import { useState } from "react";
import { ethers } from "ethers";
import useBettingContract from "./use-betting-contract";
import reportHash from "@/utils/report-hash";

export default function useDraw(onSuccess: (isWinner: boolean) => void) {
  const [drawing, setDrawing] = useState(false);
  const toast = useToast();
  const BettingContract = useBettingContract();

  const onDraw = async (poolId: number, times: number) => {
    if (poolId === -1 || !BettingContract) {
      return;
    }
    setDrawing(true);
    try {
      const poolState = await BettingContract.getPoolState(poolId);
      const poolConfig = await BettingContract.poolConfigs(poolId);
      console.log("poolConfig", poolId, poolConfig);
      console.log("poolState", poolState);
      if (poolState.winner !== "0x0000000000000000000000000000000000000000") {
        toast.fail({ title: "Pool is already drawn" });
        return;
      }
      const flipFee = await BettingContract.getFlipFee();
      console.log("flipFee", flipFee);
      const method = times > 1 ? "drawMultiple" : "drawOnce";
      const userRandomNumber = ethers.utils.hexlify(
        ethers.utils.randomBytes(32)
      );
      const params =
        times > 1
          ? [poolId, times, userRandomNumber]
          : [poolId, userRandomNumber];
      console.log("params", method, params);
      const estimateGas = await BettingContract.estimateGas[method](...params, {
        value: flipFee
      });
      console.log("estimateGas", estimateGas.toString());

      const tx = await BettingContract[method](...params, {
        value: flipFee,
        gasLimit: estimateGas.mul(120).div(100)
      });
      const receipt = await tx.wait();
      console.log("receipt", receipt);
      reportHash(receipt.transactionHash, receipt.blockNumber);
      if (receipt.status === 0) {
        toast.fail({ title: "Draw failed" });
        return;
      }

      const afterPoolState = await BettingContract.getPoolState(poolId);
      onSuccess(
        afterPoolState.winner !== "0x0000000000000000000000000000000000000000"
      );
      toast.success({
        title:
          afterPoolState.winner !== "0x0000000000000000000000000000000000000000"
            ? "You are the winner"
            : "Draw success"
      });
    } catch (error) {
      console.error(error);
    } finally {
      setDrawing(false);
    }
  };
  return {
    drawing,
    onDraw
  };
}
