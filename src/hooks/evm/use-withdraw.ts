import { ethers } from "ethers";
import { useState } from "react";
import nftAbi from "@/config/abis/nft";
import tokenAbi from "@/config/abis/token";
import reportHash from "@/utils/report-hash";
import useToast from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth";
import { sendEthereumTransaction } from "@/utils/transaction/send-evm-transaction";

export default function useWithdraw(onSuccess: () => void) {
  const [withdrawing, setWithdrawing] = useState(false);
  const { wallet } = useAuth();
  const toast = useToast();
  const onWithdraw = async ({
    type,
    amount,
    address,
    receiveAddress,
    tokenId
  }: any) => {
    setWithdrawing(true);
    try {
      const ethereumProvider = await wallet?.getEthereumProvider();
      if (!ethereumProvider || !wallet) {
        return;
      }
      const provider = new ethers.providers.Web3Provider(ethereumProvider);
      const signer = provider.getSigner();
      const Contract = new ethers.Contract(
        address,
        type === "coin" ? tokenAbi : nftAbi,
        signer
      );
      const method = type === "coin" ? "transfer" : "safeTransferFrom";
      const params =
        type === "coin"
          ? [receiveAddress, amount]
          : [wallet.address, receiveAddress, tokenId];
      const tx = await Contract.populateTransaction[method](...params);
      const receipt = await sendEthereumTransaction(tx, wallet);
      // const receipt = await tx.wait();
      if (receipt) {
        reportHash({
          hash: receipt.transactionHash,
          block_number: receipt.blockNumber,
          chain: "Berachain",
          user: receipt?.from
        });
      }
      if (receipt?.status === 0) {
        toast.fail({ title: "Withdraw failed" });
        return;
      }
      onSuccess?.();
      toast.success({ title: "Withdraw success" });
    } catch (err) {
      console.error(err);
    } finally {
      setWithdrawing(false);
    }
  };
  return {
    withdrawing,
    onWithdraw
  };
}
