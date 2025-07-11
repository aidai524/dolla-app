import AddBtn from "./add-btn";
import SideBtnBg from "./side-btn-bg";

export default function BalanceBtn() {
  return (
    <div className="relative w-[322px] pl-[30px] pr-[10px] font-[BlackHanSans] ml-[40px] mt-[10px]">
      <SideBtnBg className="absolute top-0 left-0" />
      <div className="flex items-center justify-between relative z-[2] h-[58px] mt-[6px]">
        <div className="text-[#FFEF43] text-[16px]">BALANCE</div>
        <div className="text-white text-[20px] flex items-center gap-[10px]">
          <span>$2,000</span>
          <AddBtn />
        </div>
      </div>
    </div>
  );
}
