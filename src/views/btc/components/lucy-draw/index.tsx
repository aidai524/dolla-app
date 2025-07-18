import { useMemo } from "react";
import Timer from "./timer";
import useUserInfoStore from "@/stores/use-user-info";

export default function LucyDraw() {
  const { prize } = useUserInfoStore();

  const tickets = useMemo(() => {
    return prize.tickets > 99 ? "99+" : prize.tickets;
  }, [prize.tickets]);

  return (
    <div className="absolute top-[16%] right-[20px] w-[248px] h-[202px] border border-[#FFE9B2] rounded-[12px] bg-[#FFFFFF1A] backdrop-filter-[10px] p-[20px] pt-[10px]">
      <div
        className="text-center text-white text-[16px] font-[BlackHanSans]"
        style={{
          WebkitTextStroke: "2px #5E3737"
        }}
      >
        Lucky Draw
      </div>
      <div
        className="text-center text-[36px] mt-[-8px] font-[DelaGothicOne] bg-clip-text bg-[radial-gradient(50%_50%_at_50%_50%,#FFEF43_0%,#FFC42F_100%)]"
        style={{
          WebkitTextStroke: "1px #FFF79E",
          WebkitTextFillColor: "transparent"
        }}
      >
        <span>$1,000</span>
      </div>
      <Timer />
      <div className="flex items-center justify-between mt-[26px]">
        <div className="relative w-[122px] h-[30px]">
          <div className="bg-[url(/btc/ticket1.png)] w-[122px] h-[100px] bg-no-repeat bg-center bg-contain absolute top-[-36px] left-[-20px]" />
          <span
            className="absolute left-[80px] text-[#FFEF43] font-[AlfaSlabOne] text-[20px]"
            style={{
              WebkitTextStroke: "2px #5E3737"
            }}
          >
            x{tickets}
          </span>
        </div>
        {/* <button
          className="button w-[78px] h-[30px] bg-linear-to-b from-[#FFEF43] to-[#FFC42F] rounded-[8px] text-white text-[18px] font-[BlackHanSans]"
          style={{
            WebkitTextStroke: "2px #5E3737"
          }}
        >
          Buy
        </button> */}
      </div>
    </div>
  );
}
