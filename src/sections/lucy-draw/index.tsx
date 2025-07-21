import { useMemo, useState } from "react";
import Timer from "./timer";
import useUserInfoStore from "@/stores/use-user-info";
import LucyDrawHistory from "./history";
import WinResult from "./win-result";
import TicketBottom from "./bottoms/ticket";
import ResultBottom from "./bottoms/result";

export default function LucyDraw() {
  const { prize } = useUserInfoStore();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [round, setRound] = useState(0);

  const tickets = useMemo(() => {
    return prize.tickets > 99 ? "99+" : prize.tickets;
  }, [prize.tickets]);

  return (
    <div className="absolute top-[14%] right-[20px]">
      <WinResult
        onShowHistory={(_round: number) => {
          setIsHistoryOpen(true);
          setRound(_round);
        }}
      />
      <div className="w-[248px] border border-[#FFE9B2] rounded-[12px] bg-[#FFFFFF1A] overflow-hidden">
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
          <TicketBottom tickets={tickets} />
          {/* <ResultBottom /> */}
        </div>
      </div>
      <LucyDrawHistory
        open={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </div>
  );
}
