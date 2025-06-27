import config from "./bid/config";
import { usePoolDistributed } from "@/hooks/use-pool-distributed";
import clsx from "clsx";
import { useMemo } from "react";

export default function PlayerDistribution({ data }: { data: any }) {
  const { distributed, loading } = usePoolDistributed(data.id);

  return (
    <div className="w-full h-full bg-[#1A1E24] rounded-[6px]">
      <div className="pt-[12px] px-[15px] pb-[20px] border-b border-b-[#5E6B7D]/30">
        <div>Player Distribution</div>
        {config.map((item) => (
          <Item
            data={item}
            key={item.value}
            number={distributed[item.value as keyof typeof distributed]}
            total={data.accumulative_bids}
          />
        ))}
      </div>
      <div className="pt-[22px] px-[16px] flex items-center justify-between">
        <div className="text-[16px] font-bold">Degen Players</div>
        <div className="flex items-center">
          {data.degen_players
            ?.filter((player: any) => player.icon)
            .map((player: any, index: number) => (
              <img
                src={player.icon}
                key={player.user}
                className={clsx(
                  "w-[30px] h-[30px] rounded-full shrink-0",
                  index > 0 && "ml-[-10px]"
                )}
              />
            ))}
        </div>
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
    <div className="mt-[30px] flex items-center">
      <div className="text-[14px] text-[#ADBCCF] w-[58px] mr-[11px]">
        BID x{data.value}
      </div>
      <div className="h-[12px] w-[206px] mr-[10px]">
        <div
          className="h-full rounded-[1px]"
          style={{ width: `${width}%`, backgroundColor: data.color }}
        />
      </div>
      <div className="text-[14px] text-[#ADBCCF]">{number}</div>
    </div>
  );
};
