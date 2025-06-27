import Button from "@/components/button";

export default function Invite() {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="flex items-center gap-[10px] h-[32px] px-[10px] py-[5px] rounded-[6px] border border-[#2F3843] bg-[#1A1E24]">
        <div className="flex">
          <img
            src=""
            className="w-[22px] h-[22px] rounded-full border border-[2px] border-[#131417] shrink-0"
          />
          <img
            src=""
            className="w-[22px] h-[22px] rounded-full border border-[2px] border-[#131417] shrink-0 ml-[-10px]"
          />
        </div>
        <div className="text-white text-[14px]">12</div>
      </div>
      <Button className="w-[122px] h-[32px]">Invite frenz</Button>
    </div>
  );
}
