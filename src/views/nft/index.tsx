import NFTBg from "./bg";
import NFTTop from "./top";
import NFTBid from "./bid";
import Switcher from "./switcher";
import ProbabiltyChart from "./probabilty-chart";
import PlayerDistribution from "./player-distribution";
import usePoolRecommend from "../../hooks/use-pool-recommend";
import WinnerCard from "@/components/winners/winner-card";
import { useMemo, useState } from "react";

export default function NFT() {
  const { data, loading, getPoolRecommend } = usePoolRecommend(1);
  const [selectedBid, setSelectedBid] = useState(1);

  return (
    <div className="relative w-full h-full pt-[36px]">
      {data?.reward_token_info?.[0].icon && (
        <NFTBg url={data.reward_token_info[0].icon} />
      )}
      <div className="relative z-[2]">
        <NFTTop data={data} />
        <NFTBid
          data={data}
          selectedBid={selectedBid}
          setSelectedBid={(val: number) => {
            setSelectedBid(val);
          }}
        />
        <Switcher
          onClick={() => {
            getPoolRecommend();
          }}
        />
      </div>
      <div className="mt-[38px] flex gap-[14px] justify-center">
        <div className="w-[566px] h-[326px]">
          <ProbabiltyChart
            anchorPrice={data?.anchor_price}
            selectedBids={selectedBid}
            totalBids={data?.accumulative_bids || 0}
          />
        </div>
        <div className="w-[348px] h-[326px]">
          <PlayerDistribution data={data} />
        </div>
      </div>
      {/* <div className="fixed bottom-[50px] right-[20px]">
        <WinnerCard type="biggest" data={{}} />
      </div> */}
    </div>
  );
}
