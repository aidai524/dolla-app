import clsx from "clsx";

export default function Player({ active }: any) {
  return (
    <div
      className={clsx(
        "px-[30px] pt-[8px]",
        active && "drop-shadow-[0_0_10px_#FFEA00] relative"
      )}
    >
      <img
        src="/new-btc/coins/dolla-s.png"
        className="w-[50px] h-[50px] rounded-[10px]"
        alt="player"
      />
      <div className="text-[#ADADAD] text-[14px] leading-[14px] mt-[8px]">
        0xdolla
      </div>
      {active && (
        <div className="absolute top-0 right-0 px-[10px] py-[5px] rounded-[6px] bg-[#FFEF43] shadow-[0_0_6px_0_#FFC42F] text-[#000] text-[12px] leading-[14px]">
          +1 bid
        </div>
      )}
    </div>
  );
}
