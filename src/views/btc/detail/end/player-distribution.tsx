import Avatar from "@/components/avatar";
import config from "@/components/bid/config";
import { usePoolDistributed } from "@/hooks/use-pool-distributed";
import { useMemo } from "react";

export default function PlayerDistribution({
  data,
  bidsDistribution
}: {
  data: any;
  bidsDistribution: any;
}) {
  const { distributed } = usePoolDistributed(data);

  return (
    <div className="w-full h-full rounded-[10px] bg-[#00000033] mt-[10px]">
      <div className="h-full pt-[12px] px-[18px] pb-[20px] flex flex-col justify-between">
        {config.map((item) => (
          <Item
            data={item}
            key={item.value}
            number={distributed[item.value as keyof typeof distributed]}
            total={data.accumulative_bids}
            winner={data.winner_user_info}
            bidsDistribution={bidsDistribution[item.value]}
          />
        ))}
      </div>
    </div>
  );
}

const Item = ({ data, number, total, winner, bidsDistribution }: any) => {
  const width = useMemo(() => {
    if (total === 0) return 0;
    return (number / total) * 100;
  }, [number, total]);
  return (
    <div className="flex items-center">
      <div className="text-[14px] text-[#FFE9B2] w-[58px] mr-[11px]">
        BID x{data.value}
      </div>
      <div className="h-[12px] w-[294px] rounded-[6px] flex items-center">
        <div
          className="h-full rounded-[6px] mr-[16px]"
          style={{ width: `${width}%`, backgroundColor: data.color }}
        />
        {!!number && (
          <>
            <div className="text-[14px] text-[#ADBCCF]">{number}</div>
            <div className="flex items-center gap-[6px] ml-[10px]">
              <Avatar
                size={20}
                address={winner?.sol_user}
                email={winner?.email}
              />
              <span className="text-[12px] text-white">
                x{bidsDistribution}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
