export default function Annotations() {
  return (
    <div className="absolute top-[6px] right-[10px] text-[10px] text-[#5E6B7D]">
      <div className="flex items-center justify-end">
        <div className="w-[10px] h-[10px] bg-[#323B48] mr-[7px]" />
        <span className="mr-[12px]">Bar chart</span>
        <div className="w-[16px] h-[2px] bg-[#FFC42F] rounded-[2px] mr-[6px]" />
        <span>Line chart</span>
      </div>
      <div className="flex items-center justify-end mt-[4px]">
        <div className="w-[14px] h-[1px] border-b border-b-[#FFC42F] border-dashed mr-[7px]" />
        <span className="mr-[20px]">Anchor Price</span>
        <div className="w-[5px] h-[5px] bg-[#FFC42F] rounded-full mr-[4px]" />
        <span>Current Bid</span>
      </div>
    </div>
  );
}
