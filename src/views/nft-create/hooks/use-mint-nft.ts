import { useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
import nftAbi from "@/config/abis/nft";
import useToast from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth";
import { sendEthereumTransaction } from "@/utils/transaction/send-evm-transaction";

export default function useMintNft(
  nftAddress?: string,
  onSuccess?: () => void
) {
  const [minting, setMinting] = useState(false);
  const { wallet, address } = useAuth();
  const [minted, setMinted] = useState(false);
  const [mintedLoading, setMintedLoading] = useState(false);
  const toast = useToast();
  const mintNft = async () => {
    try {
      setMinting(true);

      const ethereumProvider = await wallet?.getEthereumProvider();
      if (!ethereumProvider || !nftAddress) {
        return;
      }
      const provider = new ethers.providers.Web3Provider(ethereumProvider);
      const signer = provider.getSigner();

      const NftContract = new Contract(nftAddress, nftAbi, signer);

      const tx = await NftContract.populateTransaction.safeMint();
      const receipt = await sendEthereumTransaction(tx, wallet);
      // const receipt = await tx.wait();
      console.log(receipt);
      if (receipt?.status === 0) {
        toast.fail({ title: "Mint NFT failed" });
        throw new Error("Mint NFT failed");
      }
      if (receipt?.status === 1) {
        const tokenId = receipt.logs[0].topics[3];
        console.log("tokenId", Number(tokenId));
        toast.success({ title: "Mint NFT success" });
        setMinted(true);
        onSuccess?.();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setMinting(false);
    }
  };

  const checkMinted = async () => {
    try {
      const ethereumProvider = await wallet?.getEthereumProvider();

      if (!ethereumProvider || !nftAddress) {
        return;
      }
      const provider = new ethers.providers.Web3Provider(ethereumProvider);
      const signer = provider.getSigner();

      const NftContract = new Contract(nftAddress, nftAbi, signer);

      // const res = await NftContract.ownerOf(0);
      // console.log(res);
      const balance = await NftContract.balanceOf(address);
      setMinted(balance.gt(0));
    } catch (error) {
      console.error(error);
    } finally {
      setMintedLoading(false);
    }
  };

  useEffect(() => {
    if (address && nftAddress) {
      checkMinted();
    }
  }, [address, nftAddress]);

  return { mintNft, minting, minted, mintedLoading };
}
