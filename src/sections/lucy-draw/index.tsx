import { useMemo, useState } from "react";
import Timer from "./timer";
import useUserInfoStore from "@/stores/use-user-info";
import LucyDrawHistory from "./history";

export default function LucyDraw() {
  const { prize } = useUserInfoStore();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const tickets = useMemo(() => {
    return prize.tickets > 99 ? "99+" : prize.tickets;
  }, [prize.tickets]);

  return (
    <div className="absolute top-[16%] left-[20px] w-[248px] border border-[#FFE9B2] rounded-[12px] bg-[#FFFFFF1A]">
      <div className="backdrop-filter-[10px] bg-black/50 px-[16px] pt-[2px] pb-[10px] rounded-t-[12px]">
        <div className="flex items-center justify-between">
          <span
            className="text-white font-[DelaGothicOne] text-[24px]"
            style={{
              textShadow: "0px 0px 30px #8465FF",
              WebkitTextStroke: "1px #3A3A3A"
            }}
          >
            Lucky Draw
          </span>
          <span className="text-[#FFE9B2] text-[12px]">#02</span>
        </div>
        <div className="flex items-center justify-between mt-[4px]">
          <span className="text-[20px] font-[DelaGothicOne] text-white">
            $1,000
          </span>
          <Timer />
        </div>
        <div className="flex items-center justify-between mt-[10px] text-[12px] text-[#FFE9B2]">
          <span>
            <span>Total Tickets</span>{" "}
            <span className="text-white">{tickets}</span>
          </span>
          <button
            className="button underline"
            onClick={() => setIsHistoryOpen(true)}
          >
            History
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end h-[60px] relative">
        <div className="bg-[url(/btc/ticket1.png)] w-[122px] h-[100px] bg-no-repeat bg-center bg-contain absolute top-[-20px] left-[-10px]" />
        <div className="w-[140px]">
          <div className="text-[12px] text-[#FFE9B2]">Auto Joined</div>
          <div className="flex items-center justify-between pr-[12px]">
            <span
              className="text-[#FFEF43] font-[AlfaSlabOne] text-[20px]"
              style={{
                WebkitTextStroke: "2px #5E3737"
              }}
            >
              x{tickets}
            </span>
            <button
              className="button rounded-[8px] text-white text-[18px] font-[BlackHanSans]"
              style={{
                WebkitTextStroke: "2px #5E3737"
              }}
              onClick={() => {
                console.log("buy");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <circle cx="9" cy="9" r="9" fill="#FFC42F" />
                <path d="M10 8H13V10H10V13H8V10H5V8H8V5H10V8Z" fill="black" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <LucyDrawHistory
        open={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </div>
  );
}
