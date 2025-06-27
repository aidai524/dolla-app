import BoostsIcon from "./icon";

export default function Boosts() {
  return (
    <div className="w-[130px] h-[80px] border border-[#555C1F] bg-[#EBFF571F] rounded-[12px] relative pl-[10px]">
      <div className="text-[#EBFF57] text-[14px] font-medium mt-[10px] text-shadow-[0px_0px_10px_rgba(235,255,87,0.60)]">
        Boosts
      </div>
      <div className="mt-[8px] text-white text-[10px]">
        <span className="font-light">Active:</span>{" "}
        <span className="font-medium">2/5</span>
      </div>
      <div className="w-[110px] mt-[8px] h-[5px] bg-[#00000099]">
        <div
          className="h-[5px] rounded-full bg-[#EBFF57]"
          style={{
            width: "50%"
          }}
        />
      </div>
      <BoostsIcon className="absolute top-[2px] right-[6px]" />
    </div>
  );
}
