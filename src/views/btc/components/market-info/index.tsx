import Progress from "./progress";

export default function MarketInfo() {
  return (
    <div className="absolute left-[20px] bottom-[24%]">
      <div className="flex items-center gap-[50px]">
        <div className="flex items-center gap-[8px]">
          <img
            src="/images/new-btc/header/icon-1.png"
            className="w-[32px] h-[32px] rounded-[6px] border border-[2px] border-white/40"
          />
          <div>
            <div className="text-[#FFE9B2] text-[12px]">Provider</div>
            <div className="text-white text-[14px]">0xdolla</div>
          </div>
        </div>
        <div>
          <div className="text-[#FFE9B2] text-[12px]">Players</div>
          <div className="text-white text-[14px]">0xdolla</div>
        </div>
        <div>
          <div className="text-[#FFE9B2] text-[12px]">Bid</div>
          <div className="text-white text-[14px]">0xdolla</div>
        </div>
      </div>
      <div className="mt-[28px] font-[BlackHanSans]">
        <div
          className="text-white text-[16px] [text-shadow:_-2px_0_#5E3737,0_2px_#5E3737,2px_0_#5E3737,0_-2px_#5E3737] [font-size:16px] [--tw-text-stroke-width:2px] [--tw-text-stroke-color:#5E3737]"
          style={{
            WebkitTextStrokeWidth: "2px",
            WebkitTextStrokeColor: "#5E3737"
          }}
        >
          GRAND
        </div>
        <div
          className="font-[BlackHanSans] mt-[-8px] text-[46px] bg-clip-text bg-[linear-gradient(180deg,#FFF698_0%,#FFC42F_100%)]"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          0.1 BTC
        </div>
      </div>
      <div className="mt-[28px] font-[BlackHanSans]">
        <div
          className="text-white text-[16px] [text-shadow:_-2px_0_#5E3737,0_2px_#5E3737,2px_0_#5E3737,0_-2px_#5E3737] [font-size:16px] [--tw-text-stroke-width:2px] [--tw-text-stroke-color:#5E3737]"
          style={{
            WebkitTextStrokeWidth: "2px",
            WebkitTextStrokeColor: "#5E3737"
          }}
        >
          Valued
        </div>
        <div
          className="font-[BlackHanSans] mt-[-8px] text-[46px] bg-clip-text bg-[linear-gradient(180deg,#FFF698_0%,#FFC42F_100%)]"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          $11,147.2
        </div>
      </div>
      <Progress progress={20} />
    </div>
  );
}
