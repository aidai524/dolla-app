// import NFTBg from "./bg";
import NFTTop from "./top";
import NFTBid from "./bid";
import Switcher from "./switcher";
import ProbabiltyChart from "./probabilty-chart";
import PlayerDistribution from "./player-distribution";
import usePoolRecommend from "../../hooks/use-pool-recommend";
// import WinnerCard from "@/components/winners/winner-card";
import { useMemo, useState } from "react";
import { getAnchorPrice } from "@/utils/pool";
import usePoolInfo from "@/hooks/use-pool-info";

export default function NFT() {
  const { data, getPoolRecommend } = usePoolRecommend(1);
  const [selectedBid, setSelectedBid] = useState(1);
  const { onQueryPoolInfo, poolInfo } = usePoolInfo("Berachain");
  const [refresh, setRefresh] = useState(0);

  const mergedData = useMemo(() => {
    return {
      ...data,
      ...poolInfo
    };
  }, [data, poolInfo]);

  return (
    <div className="relative w-full h-full pt-[36px]">
      <div className="relative z-[2]">
        <NFTTop data={mergedData} />
        <NFTBid
          data={data}
          selectedBid={selectedBid}
          setSelectedBid={(val: number) => {
            setSelectedBid(val);
          }}
          onDrawSuccess={async () => {
            setTimeout(async () => {
              await onQueryPoolInfo(data.pool_id);
            }, 2000);
            setRefresh(refresh + 1);
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
            anchorPrice={getAnchorPrice(data)}
            selectedBids={selectedBid}
            totalBids={mergedData?.accumulative_bids || 0}
          />
        </div>
        <div className="w-[348px] h-[326px]">
          <PlayerDistribution data={mergedData} key={refresh} />
        </div>
      </div>
      {/* <div className="fixed bottom-[50px] right-[20px]">
        <WinnerCard type="biggest" data={{}} />
      </div> */}
    </div>
  );
}
