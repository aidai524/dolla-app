import AddBtn from "./add-btn";
import SideBtnBg from "./side-btn-bg";

export default function MultipleBtn() {
  return (
    <div className="relative w-[322px] pr-[30px] pl-[20px] font-[BlackHanSans] mr-[40px] mt-[10px]">
      <SideBtnBg className="absolute top-0 left-0 rotate-y-180" />
      <div className="flex items-center justify-between relative z-[2] h-[58px] mt-[6px]">
        <div className="text-white text-[20px] flex items-center gap-[10px]">
          <AddBtn isAdd={false} disabled />
          <input
            type="number"
            className="w-[90px] h-[30px]"
            min={1}
            defaultValue={1}
          />
          <AddBtn />
        </div>
        <div className="text-[#FFEF43] text-[16px]">MUTIPLE</div>
      </div>
    </div>
  );
}
