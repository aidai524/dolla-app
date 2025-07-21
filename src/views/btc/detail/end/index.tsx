import MultiIcon from "./multi-icon";
import PlayerDistribution from "./player-distribution";

export default function EndPanel() {
  return (
    <div className="w-[815px] h-full flex gap-[20px] p-[20px] rounded-[20px] border border-[#605D55] bg-[#FFFFFF1A] backdrop-blur-[10px]">
      <div className="w-[250px] h-full rounded-[20px] bg-[#00000033] px-[20px] pt-[10px]">
        <div className="flex items-center justify-between">
          <span
            className="text-white text-[24px] [text-shadow:0_0_10px_rgba(255,213,105,0.5)] font-[DelaGothicOne]"
            style={{
              WebkitTextStroke: "1px #EEAF0F"
            }}
          >
            Winner
          </span>
          <button className="text-[12px] underline button text-[#FFE9B2]">
            Verify
          </button>
        </div>
        <div className="relative w-[150px] h-[150px] p-[3px] mx-auto mt-[47px] rounded-full bg-linear-to-b from-[#DD9000] via-[#FFBF47] to-[#774E00] flex items-center justify-center">
          <div className="absolute top-[-30px] right-[-30px] w-[93px] h-[93px] flex items-center justify-center">
            <MultiIcon className="absolute top-0 left-0 w-full h-full" />
            <div className="text-black text-[24px] font-[DelaGothicOne] relative z-[1] rotate-[8deg]">
              x100
            </div>
          </div>
          <img src="" className="w-full h-full rounded-full" />
        </div>
        <div className="text-white text-center text-[16px] font-[DelaGothicOne] mt-[10px]">
          0xdollar
        </div>
        <div className="flex items-center justify-between mt-[30px]">
          <span className="text-[#FFE9B2] text-[14px]">Winner’s bid</span>
          <span className="text-white text-[12px] font-[DelaGothicOne]">
            $350
          </span>
        </div>
        <div className="flex items-center justify-between mt-[4px]">
          <span className="text-[#FFE9B2] text-[14px]">Bid times</span>
          <span className="text-white text-[12px] font-[DelaGothicOne]">
            $350
          </span>
        </div>
        <div className="flex items-center justify-between mt-[4px]">
          <span className="text-[#FFE9B2] text-[14px]">Return multiple</span>
          <span className="text-white text-[12px] font-[DelaGothicOne]">
            $350
          </span>
        </div>
      </div>
      <div className="grow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <img
              src=""
              className="w-[32px] h-[32px] rounded-[6px] border border-[#FFFFFF66]"
            />
            <div>
              <div className="text-[#FFE9B2] text-[12px]">Provider</div>
              <div className="text-white text-[12px] font-[DelaGothicOne]">
                0xdolla
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[#FFE9B2] text-[12px]">Started from</div>
            <div className="text-white text-[14px]">12:50 20 June, 2025 </div>
          </div>
        </div>
        <div className="flex items-center gap-[12px] mt-[16px] font-[DelaGothicOne] text-white">
          <div className="w-1/3 h-[70px] flex flex-col items-center justify-center bg-[#00000033] rounded-[10px]">
            <div className="text-[12px]">Total Players</div>
            <div className="text-[16px]">924</div>
          </div>
          <div className="w-1/3 h-[70px] flex flex-col items-center justify-center bg-[#00000033] rounded-[10px]">
            <div className="text-[12px]">Total Bid</div>
            <div className="text-[16px]">$12,450</div>
          </div>
          <div className="w-1/3 h-[70px] flex flex-col items-center justify-center bg-[#00000033] rounded-[10px]">
            <div className="text-[12px]">Time Duration</div>
            <div className="text-[16px]">5 days</div>
          </div>
        </div>
        <div className="mt-[8px]">
          <div className="text-white text-[12px] font-[DelaGothicOne]">
            Winner’s Bid Timing
          </div>
          <div className="w-full relative h-[6px] mt-[40px] bg-linear-to-r from-[#FFC42F] via-[#FF43E0] to-[#53EABF] rounded-[6px]">
            <div className="w-[28px] h-[28px] border border-[#DD9000] rounded-full absolute top-[-33px]">
              <img
                className="w-full h-full rounded-full relative z-[1]"
                src=""
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="6"
                viewBox="0 0 8 6"
                fill="none"
                className="absolute bottom-[-6px] left-[50%] translate-x-[-50%]"
              >
                <path
                  d="M3.18912 4.8764C3.58825 5.42946 4.41175 5.42946 4.81088 4.87641L7.1861 1.58521C7.6634 0.923842 7.19083 0 6.37522 0H1.62478C0.809174 0 0.336598 0.923841 0.813896 1.58521L3.18912 4.8764Z"
                  fill="#DD9000"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-[24px] h-[calc(100%-250px)]">
          <div className="text-white text-[12px] font-[DelaGothicOne]">
            Player Distribution
          </div>
          <PlayerDistribution data={{}} />
        </div>
      </div>
    </div>
  );
}
