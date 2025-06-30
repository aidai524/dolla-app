import { useState } from "react";
import Big from "big.js";
import { PURCHASE_TOKEN } from "@/config";
import useToast from "@/hooks/use-toast";
import useBettingContract from "./use-betting-contract";
import reportHash from "@/utils/report-hash";

export default function useCreate({
  token,
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
  const toast = useToast();
  const BettingContract = useBettingContract();

  const onCreate = async () => {
    if (!BettingContract) {
      return;
    }
    try {
      setCreating(true);

      // check token is whitelisted
      const [purchaseTokens, erc20RewardTokens, erc721RewardTokens] =
        await BettingContract.getAllWhitelistedTokens();
      const isPurchaseTokenWhitelisted = purchaseTokens.filter(
        (item: any) =>
          item.toLowerCase() === PURCHASE_TOKEN.address.toLowerCase()
      );

      const isRewardTokenWhitelisted = (
        token.type === "nft" ? erc721RewardTokens : erc20RewardTokens
      ).filter(
        (item: any) => item.toLowerCase() === token.address.toLowerCase()
      );

      if (
        !isPurchaseTokenWhitelisted.length ||
        !isRewardTokenWhitelisted.length
      ) {
        throw new Error("Token not whitelisted");
      }

      const rewardAmount =
        token.type === "nft"
          ? 0
          : Big(amount * 10 ** token.decimals).toFixed(0);

      const drawFee = Big(1 * 10 ** PURCHASE_TOKEN.decimals).toFixed(0);

      const tx = await BettingContract.createPool(
        PURCHASE_TOKEN.address,
        token.address,
        rewardAmount,
        token.id || token.id === 0 ? [token.id] : [], // nftIds
        drawFee,
        Math.round(anchorPrice).toFixed(0)
      );
      const receipt = await tx.wait();
      console.log("receipt", receipt);
      reportHash(receipt.transactionHash, receipt.blockNumber);
      if (receipt.status === 0) {
        toast.fail({ title: "Create pool failed" });
        throw new Error("Create pool failed");
      }

      toast.success({ title: "Create pool success" });
      const poolId = receipt.logs[0].topics[1];
      onCreateSuccess?.(Number(poolId));
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
