import { formatNumber } from "@/utils/format/number";

export default function Annotations({
  anchorPrice,
  expectedValue
}: {
  anchorPrice?: number;
  expectedValue?: number;
}) {
  return (
    <div className="absolute z-[1] right-[12px] top-0 w-[172px] bg-[#1A1E24] rounded-[6px] py-[12px] text-[10px] text-[#5E6B7D]">
      <div className="flex items-center justify-end gap-[5px]">
        <div className="w-[14px] h-[2px] bg-[#57FF70] rounded-[2px]" />
        <span>Probability Weighted Return</span>
      </div>
      <div className="flex items-center justify-end gap-[5px]">
        <div className="w-[14px] h-[1px] border-b border-b-[#8C8B8B] border-dashed" />
        <span>Anchor Price = ${formatNumber(anchorPrice, 2, true)}</span>
      </div>
      <div className="flex items-center justify-end gap-[5px]">
        <div className="w-[14px] h-[1px] border-b border-b-[#FFC42F] border-dashed" />
        <span>Expected Value = ${formatNumber(expectedValue, 2, true)}</span>
      </div>
      <div className="flex items-center justify-end">
        <div className="w-[17px] h-[8px] bg-[#FF5A9780] mr-[3px]" />
        <span>Loss</span>
        <div className="w-[17px] h-[8px] bg-[#57FF7080] mr-[3px] ml-[12px]" />
        <span>Profit</span>
      </div>
    </div>
  );
}
