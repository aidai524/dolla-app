import clsx from "clsx";
import BidBg from "./bg";
import BalanceBtn from "./balance-btn";
import BidBtn from "./bid-btn";
import MultipleBtn from "./multiple-btn";
import { useBtcContext } from "../context";

export default function Bid({ className }: { className?: string }) {
  const { manualFlip, isFlipping } = useBtcContext();
  return (
    <div className={clsx("relative", className)}>
      <BidBg className="absolute top-[-20px] left-0" />
      {/* <div className="w-full h-[2px] bg-[#0A070B] absolute bottom-[-14px] left-0 z-[1]" /> */}
      <div className="relative z-[2] h-full flex items-center justify-center pt-[20px]">
        <div className="text-[14px] text-[#CAAB5E] mt-[10px]">· Rules</div>
        <BalanceBtn />
        <BidBtn
          onClick={() => {
            manualFlip();
          }}
          loading={isFlipping}
        />
        <MultipleBtn />
        <div className="text-[14px] text-[#CAAB5E] mt-[10px]">
          · Provably fair
        </div>
      </div>
    </div>
  );
}
