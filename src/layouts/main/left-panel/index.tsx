// import Boosts from "./boosts";
// import Airdrop from "./airdrop";
// import Jackpot from "./jackpot";
import Others from "./others";
// import ListPrize from "../list-prize";
import Bottom from "./bottom";
import Winners from "../../../components/winners";

export default function LeftPanel({ data }: { data: any }) {
  return (
    <div className="w-[268px] pl-[16px] relative h-full">
      <img src="/logo.png" alt="logo" className="w-[95px] h-[95px] ml-[20px]" />
      {/* <div className="flex gap-[8px]">
        <Boosts />
        <Airdrop />
      </div> */}
      {/* <Jackpot /> */}
      <div className="h-[calc(100%-120px)] overflow-y-auto">
        <Others />
        <Winners
          lastWinner={data?.latest_winner}
          highestWinner={data?.highest_multiplier_winner}
        />
      </div>
      {/* <ListPrize /> */}
      <Bottom totalBets={data?.total_bets} />
    </div>
  );
}
