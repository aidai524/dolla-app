import Coin from "@/components/icons/coin";
import { formatNumber } from "@/utils/format/number";
import clsx from "clsx";

export default function Profit({ profit }: { profit: number }) {
  return (
    //  Number(profit) > 0
    <button className={clsx("relative", false && "group")}>
      <div
        className={clsx(
          "button text-[#57FF70] text-[20px] font-medium",
          false && "border-b border-dashed border-[#5E6B7D]"
        )}
      >
        {Number(profit) < 0 && "-"}
        {formatNumber(Math.abs(profit), 0, true, {
          prefix: "$"
        })}
      </div>
      <div className="absolute z-[100] top-[30px] left-[-70px] w-[160px] h-[92px] border border-[#484848] bg-[#1A1E24] rounded-[6px] px-[11px] text-[12px] py-[8px] flex flex-col justify-around opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="text-[#5E6B7D]">Total bid</div>
          <div className="flex items-center gap-[2px]">
            <span className="text-white">304</span>
            <Coin size={12} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#5E6B7D]">Total won</div>
          <div className="flex items-center gap-[2px]">
            <span className="text-white">~304</span>
            <Coin size={12} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#5E6B7D]">Total bid</div>
          <div className="flex items-center gap-[2px]">
            {/* <span className="text-[#FF5757]">-35</span> */}
            <span className="text-[#57FF70]">+35</span>
            <Coin size={12} />
          </div>
        </div>
      </div>
    </button>
  );
}
