import Card from "../components/card";
import { useHome } from "@/contexts/home";
import clsx from "clsx";
import { formatNumber } from "@/utils/format/number";
import ParticipantIcon from "../components/card/participant-icon";
import Chart from "./probabilty-chart";
import PlaceBet from "../components/place-bid";

export default function Top({ drawInfo, onSuccess }: any) {
  const { updatedDraws } = useHome();

  return (
    <div className="h-[532px] mt-[-10px] px-[20px] relative">
      <div className="absolute left-[352px] z-[1] flex gap-[10px] w-[526px] overflow-hidden">
        <div className="bg-[url('/1-dollar-win/won.png')] bg-repeat bg-center w-[124px] h-[509px]" />
        <div className="bg-[url('/1-dollar-win/won.png')] bg-repeat bg-center w-[124px] h-[509px] opacity-80" />
        <div className="bg-[url('/1-dollar-win/won.png')] bg-repeat bg-center w-[124px] h-[509px] opacity-60" />
        <div className="bg-[url('/1-dollar-win/won.png')] bg-repeat bg-center w-[124px] h-[509px] opacity-40" />
      </div>
      <div className="flex gap-[40px] relative z-[10]">
        <Card
          data={{
            ...drawInfo,
            ...(updatedDraws[drawInfo.id] || {})
          }}
          from="detail"
        />
        <div className="w-[calc(100%-389px)]">
          <div className="flex gap-[10px]">
            <div className="w-1/2 px-[12px] bg-[#141519] py-[16px] flex justify-between items-center border border-[#373737] rounded-[10px] text-[#fff] text-[12px]">
              <div className="flex items-center gap-[4px]">
                <img
                  src="/currency/bera.webp"
                  className={clsx("rounded-full", "w-[21px] h-[21px]")}
                />
                <span>Accumulative Bids</span>
              </div>
              <div className="font-bold">
                {formatNumber(drawInfo.sold_shares, 2, true)}
              </div>
            </div>
            <div className="w-1/2 px-[12px] bg-[#141519] py-[16px] flex justify-between items-center border border-[#373737] rounded-[10px] text-[#fff] text-[12px]">
              <div className="flex items-center gap-[4px]">
                <ParticipantIcon className="scale-[1.2]" />
                <span>Participants</span>
              </div>
              <div className="font-bold">
                {formatNumber(drawInfo.buyers.length, 2, true)}
              </div>
            </div>
          </div>
          <Chart data={drawInfo} />
          <PlaceBet data={drawInfo} onSuccess={onSuccess} />
        </div>
      </div>
    </div>
  );
}
