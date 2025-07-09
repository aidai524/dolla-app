import Item from "./item";

export default function Bid() {
  return (
    <div className="font-[AlfaSlabOne] fixed w-screen h-screen  overflow-y-auto top-0 left-0 bg-[rgba(25,10,50,0.80)] backdrop-blur-[10px] z-[500] pt-[30px]">
      <div className="flex justify-center items-center gap-[10px] text-[#FFEF43]">
        <div className="text-[80px] leading-[100%] [text-stroke:2px_#5E3737] [-webkit-text-stroke:2px_#5E3737]">
          100
        </div>
        <div>
          <div className="text-[32px] leading-[100%] [text-stroke:2px_#5E3737] [-webkit-text-stroke:2px_#5E3737]">
            Wild Time
          </div>
          <div className="text-[32px] leading-[100%]">Free Bid</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-[8px]">
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
}
