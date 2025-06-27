import BTCBg from "./bg";
import BTCTop from "./top";
import NFTBid from "../nft/bid";
import ProbabiltyChart from "../nft/probabilty-chart";
import PlayerDistribution from "../nft/player-distribution";
import MoreMarketsBtn from "./markets/more-markets-btn";
import BTCMarkets from "./markets";
import ShareBtn from "./share-btn";
import { useMemo, useRef, useState } from "react";
import usePoolRecommend from "../../hooks/use-pool-recommend";
import { formatNumber } from "@/utils/format/number";

export default function BTC() {
  const marketsRef = useRef<any>(null);
  const { data, loading } = usePoolRecommend(0);
  const [selectedMarket, setSelectedMarket] = useState<any>(null);

  const pool = useMemo(() => {
    return selectedMarket || data;
  }, [selectedMarket, data]);

  return (
    <div className="relative w-full h-full">
      <BTCMarkets
        ref={marketsRef}
        onSelectMarket={(market: any) => {
          setSelectedMarket(market);
        }}
      />
      <BTCBg />
      <div className="relative z-[2] w-[928px] mx-auto">
        <BTCTop data={pool} />
        <NFTBid className="mt-[-40px]" data={pool} />
        <div className="absolute top-[25px] right-0 flex items-center gap-[14px]">
          <ShareBtn data={pool} />
          <MoreMarketsBtn onClick={() => marketsRef.current?.open()} />
        </div>
      </div>
      <div className="flex items-center gap-[12px] w-[928px] mx-auto mt-[40px]">
        <div className="h-[40px] p-[13px] flex items-center gap-[20px] text-[14px] bg-[#1A1E24] rounded-[6px]">
          <span className="text-[#ADBCCF]">Participants</span>
          <span className="text-white font-bold">{pool?.participants}</span>
        </div>
        <div className="h-[40px] p-[13px] flex items-center gap-[20px] text-[14px] bg-[#1A1E24] rounded-[6px]">
          <span className="text-[#ADBCCF]">Accumulative Bids</span>
          <span className="text-white font-bold">
            {formatNumber(pool?.accumulative_bids, 0, true)}
          </span>
        </div>
      </div>
      <div className="mt-[8px] flex gap-[14px] justify-center">
        <div className="w-[566px] h-[326px]">
          <ProbabiltyChart
            anchorPrice={pool?.reward_token_price?.[0]?.last_price}
            yourBid={pool?.user_draw_attempt || 0}
          />
        </div>
        <div className="w-[348px] h-[326px]">
          <PlayerDistribution data={pool} />
        </div>
      </div>
    </div>
  );
}
