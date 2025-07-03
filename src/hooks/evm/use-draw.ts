import useToast from "../use-toast";
import { useState } from "react";
import { ethers } from "ethers";
import useBettingContract from "./use-betting-contract";
import reportHash from "@/utils/report-hash";
import { useAuth } from "@/contexts/auth";
import { sendEthereumTransaction } from "@/utils/transaction/send-evm-transaction";

export default function useDraw(onSuccess: (isWinner: boolean) => void) {
  const [drawing, setDrawing] = useState(false);
  const toast = useToast();
  const BettingContract = useBettingContract();
  const { wallet } = useAuth();

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
        setDrawing(false);
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

      const tx = await BettingContract.populateTransaction[method](...params, {
        value: flipFee
      });

      const receipt = await sendEthereumTransaction(tx, wallet);

      setDrawing(false);
      // const tx = await BettingContract[method](...params, {
      //   value: flipFee,
      //   gasLimit: estimateGas.mul(120).div(100)
      // });
      // const receipt = await tx.wait();
      console.log("receipt", receipt);
      if (receipt) {
        reportHash({
          hash: receipt.transactionHash,
          block_number: receipt.blockNumber,
          chain: "Berachain",
          user: receipt.from
        });
      }
      if (receipt?.status === 1) {
        const afterPoolState = await BettingContract.getPoolState(poolId);
        console.log("afterPoolState", afterPoolState);
        onSuccess(
          afterPoolState.winner !== "0x0000000000000000000000000000000000000000"
        );
        toast.success({
          title:
            afterPoolState.winner !==
            "0x0000000000000000000000000000000000000000"
              ? "You are the winner"
              : "Draw success"
        });
        setDrawing(false);
      }
    } catch (error) {
      setDrawing(false);
      console.error(error);
    }
  };
  return {
    drawing,
    onDraw
  };
}
