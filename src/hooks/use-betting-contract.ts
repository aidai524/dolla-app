import { ethers } from "ethers";
import BettingContractAbi from "@/config/abis/betting";
import { BETTING_CONTRACT_ADDRESS } from "@/config";
import { useWallets } from "@privy-io/react-auth";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import getContractSigner from "@/utils/wallet/get-contract-signer";

export default function useBettingContract(account?: string) {
  const { wallets } = useWallets();
  const [bettingContract, setBettingContract] = useState<any>(null);
  const { address: walletAddress } = useAuth();

  useEffect(() => {
    if (!wallets) {
      return;
    }
    const init = async () => {
      const wallet = wallets.find(
        // (item: any) => item.walletClientType === "metamask"
        (item: any) => item.address === (account || walletAddress)
      );
      const ethereumProvider = await wallet?.getEthereumProvider();
      if (!ethereumProvider) {
        return;
      }
      const signer = await getContractSigner(wallet, ethereumProvider);

      const BettingContract = new ethers.Contract(
        BETTING_CONTRACT_ADDRESS,
        BettingContractAbi,
        signer
      );
      setBettingContract(BettingContract);
    };
    init();
  }, [wallets]);

  return bettingContract;
}
