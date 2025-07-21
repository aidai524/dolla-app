import config from "@/components/bid/config";
import { usePoolDistributed } from "@/hooks/use-pool-distributed";
import { useMemo } from "react";

export default function PlayerDistribution({ data }: { data: any }) {
  const { distributed } = usePoolDistributed(data);

  return (
    <div className="w-full h-full rounded-[10px] bg-[#00000033] mt-[10px]">
      <div className="h-full pt-[12px] px-[8px] pb-[20px] flex flex-col justify-between">
        {config.map((item) => (
          <Item
            data={item}
            key={item.value}
            number={distributed[item.value as keyof typeof distributed]}
            total={data.accumulative_bids}
          />
        ))}
      </div>
    </div>
  );
}

const Item = ({ data, number, total }: any) => {
  const width = useMemo(() => {
    if (total === 0) return 0;
    return (number / total) * 100;
  }, [number, total]);
  return (
    <div className="flex items-center">
      <div className="text-[14px] text-[#FFE9B2] w-[58px] mr-[11px]">
        BID x{data.value}
      </div>
      <div className="h-[12px] w-[294px] mr-[10px] rounded-[6px]">
        <div
          className="h-full rounded-[6px]"
          style={{ width: `${width}%`, backgroundColor: data.color }}
        />
      </div>
      <div className="text-[14px] text-[#ADBCCF]">{number}</div>
      <div className="flex items-center gap-[6px] ml-[10px]">
        <img
          className="w-[20px] h-[20px] rounded-full border-[#DD9000]"
          src=""
        />
        <span className="text-[12px] text-white">x22</span>
      </div>
    </div>
  );
};
