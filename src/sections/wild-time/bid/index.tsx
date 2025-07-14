import Item from "./item";

export default function Bid() {
  return (
    <div className="font-[AlfaSlabOne] fixed w-screen h-screen top-0 left-0 pt-[122px] bg-[rgba(25,10,50,0.80)] backdrop-blur-[10px] z-[500]">
      <div
        className="text-[60px] text-center leading-[100%] font-[AlfaSlabOne] bg-gradient-to-b from-[#FFEF43] to-[#FFC42F] bg-clip-text text-transparent"
        style={{
          WebkitTextStrokeWidth: "2px",
          WebkitTextStrokeColor: "#5E3737"
        }}
      >
        <div>Wild Time</div>
        <div className="text-[46px] mt-[10px]">1/1</div>
      </div>
      <div className="flex gap-[8px] justify-center pt-[100px] gap-[60px]">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
}
