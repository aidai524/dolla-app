import { useState, useEffect } from "react";
import mock from "../mock";
import axiosInstance from "@/libs/axios";
import { useDebounceFn } from "ahooks";
import nftAbi from "@/config/abis/nft";
import { usePublicClient } from "wagmi";
import { useAuth } from "@/contexts/auth";

export default function useNfts() {
  const [chains, setChains] = useState<any[]>([]);
  const [chain, setChain] = useState<any>({});
  const [collections, setCollections] = useState<any[]>([]);
  const [collection, setCollection] = useState<any>({});
  const [nfts, setNfts] = useState<any[]>([]);
  const [nft, setNft] = useState<any>({});
  const [loadingCollections, setLoadingCollections] = useState<boolean>(false);
  const [listPrice, setListPrice] = useState<number>(0);
  const [loadingNfts, setLoadingNfts] = useState<boolean>(false);
  const { wallet } = useAuth();
  const publicClient = usePublicClient();

  useEffect(() => {
    setChains(mock);
    setChain(mock[0]);
    fetchCollections();
  }, []);

  const onSelectCollection = (collection: any) => {
    setCollection(collection);
  };
  const onSelectNft = (nft: any) => {
    setNft(nft);
    setListPrice(0);
  };

  const fetchCollections = async () => {
    setLoadingCollections(true);
    try {
      const res = await axiosInstance.get(`/api/v1/config`);
      setCollections(res.data.data.nft_config);
      setCollection(res.data.data.nft_config[0]);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingCollections(false);
    }
  };

  const fetchNfts = async () => {
    setLoadingNfts(true);
    try {
      if (!collection.address || !publicClient) {
        setNfts([]);
        return;
      }

      const address = wallet?.address;
      if (!address) {
        setNfts([]);
        return;
      }

      // Method 1: Using viem's readContract for single calls
      const balanceOfResult = await publicClient.readContract({
        address: collection.address as `0x${string}`,
        abi: nftAbi as any,
        functionName: "balanceOf",
        args: [address as `0x${string}`]
      });

      const balance = Number(balanceOfResult);

      if (!balance) {
        setNfts([]);
        return;
      }

      console.log("User NFT balance:", balance);

      // Method 2: Using viem's multicall for batch reading

      const multicallContracts = [];

      // Create contracts array for multicall
      for (let i = 0; i < balance; i++) {
        multicallContracts.push({
          address: collection.address as `0x${string}`,
          abi: nftAbi as any,
          functionName: "tokenOfOwnerByIndex",
          args: [address as `0x${string}`, BigInt(i)]
        });
      }

      // Execute multicall using viem's batch calls
      const ownerResults = await Promise.all(
        multicallContracts.map((contract) =>
          publicClient.readContract(contract).catch((error) => ({
            status: "error",
            error,
            result: null
          }))
        )
      );

      const _nfts = ownerResults
        .filter((nft: any) => Number(nft) > 0)
        .map((nft: any) => {
          return {
            id: Number(nft)
          };
        });
      if (_nfts.length > 0) {
        setNfts(_nfts);
        setNft(_nfts[0]);
      } else {
        setNfts([]);
      }
    } catch (error) {
      console.log("error", error);
      setNfts([]);
    } finally {
      setLoadingNfts(false);
    }
  };

  useEffect(() => {
    if (collection.address && wallet) {
      fetchNfts();
    }
  }, [collection.address, wallet]);

  return {
    chains,
    chain,
    collections,
    onSelectCollection,
    nfts,
    collection,
    onSelectNft,
    nft,
    loadingCollections,
    listPrice,
    setListPrice,
    loadingNfts,
    fetchNfts
  };
}
