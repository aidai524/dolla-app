// import NFTEmptyCard from "./nft-empty-card";

import ListPrice from "./list-price";
import useNfts from "./hooks/use-nfts";
import { useMemo, useState } from "react";
import clsx from "clsx";
import Nfts from "./nfts";
import { useAuth } from "@/contexts/auth";

export default function ListNFT() {
  const {
    chains,
    chain,
    collections,
    onSelectCollection,
    nfts,
    collection,
    onSelectNft,
    fetchNfts,
    nft,
    listPrice,
    setListPrice
  } = useNfts();
  const { address } = useAuth();

  const errorTips = useMemo(() => {
    if (!chain.id) return "Select a chain";
    if (!collection.id) return "Select a collection";
    if (!nft.id) return "Select a NFT";
    if (!listPrice) return "Select a list price";
    return "";
  }, [chain, collection, nft, listPrice]);

  const selectedToken = useMemo(() => {
    return {
      type: "nft",
      address: collection.address,
      id: nft?.id
    };
  }, [collection, nft]);

  return (
    <div className="pt-[20px] max-w-[860px] pb-[50px]">
      <div className="text-[16px] text-white font-semibold mb-[20px]">
        Create Market
      </div>
      <div className="flex items-center h-[60px] bg-[#141519] rounded-[6px] px-[26px] mb-[12px]">
        <div className="text-[14px] text-white font-light w-[100px]">
          Chains
        </div>
        <div className="flex items-center gap-[20px]">
          {chains.map((item, index) => (
            <div
              key={item.id}
              className={clsx(
                chain.id === item.id &&
                  "p-[4px] border border-[#FFC42F] bg-[#222A35] rounded-[6px] gap-[5px] flex items-center text-[#FFC42F]"
              )}
              onClick={() => {}}
            >
              <img className="w-[32px] h-[32px] rounded-[4px" src={item.icon} />
              {chain.id === item.id && (
                <span className="text-[12px] font-light">{item.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center h-[60px] bg-[#141519] rounded-[6px] px-[26px] mb-[12px]">
        <div className="text-[14px] text-white font-light w-[100px]">
          Collections
        </div>
        <div className="flex items-center gap-[20px]">
          {collections.map((item) => (
            <div
              key={item.id}
              className={clsx(
                "flex rounded-[6px] gap-[5px] flex items-center p-[4px] button border",
                collection.id === item.id
                  ? "border-[#FFC42F] bg-[#222A35] text-[#FFC42F]"
                  : "border-transparent"
              )}
              onClick={() => onSelectCollection(item)}
            >
              <img
                className="w-[32px] h-[32px] rounded-[4px]"
                src={item.icon}
              />
              <span className="text-[12px] font-light">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-[#373737] bg-[#141519] rounded-[10px] p-[20px] mb-[12px]">
        <div className="text-[14px] text-white font-light w-[100px]">
          Select NFT
        </div>
        <Nfts nfts={nfts} onSelectNft={onSelectNft} currentNft={nft} />
        {/* <div className="flex items-center gap-[8px] flex-wrap mt-[16px]">
          {nfts.map((item) => (
            <NFTCard
              key={item.id}
              data={item}
              checked={nft.id === item.id}
              onSelect={() => onSelectNft(item)}
            />
          ))}
        </div> */}
      </div>
      <ListPrice
        listPrice={listPrice}
        onSetListPrice={setListPrice}
        errorTips={errorTips}
        address={address}
        token={selectedToken}
        onSuccess={() => {
          fetchNfts();
        }}
      />
    </div>
  );
}
