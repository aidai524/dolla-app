import AirdropIcon, { TitleIcon } from "./icon";

export default function Airdrop() {
  return (
    <div className="w-[130px] h-[80px] border border-[#771E46] bg-[#FF60A833] rounded-[12px] relative">
      <div className="mt-[-4px] text-[#FF60A8] text-[14px] flex items-center font-medium text-shadow-[0px_0px_10px_rgba(255,96,168,0.60)]">
        <TitleIcon />
        <span>Airdrop</span>
      </div>
      <div className="mt-[-5px] pl-[10px] font-light text-[10px] text-white">
        Up to
      </div>
      <div className="text-[14px] pl-[10px] font-medium text-white">
        $500,000
      </div>
      <AirdropIcon className="absolute top-[2px] right-[6px]" />
    </div>
  );
}
