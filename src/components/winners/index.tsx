import WinnerCard from "./winner-card";

export default function Winners({ lastWinner, highestWinner }: any) {
  return (
    <div className="flex flex-col items-center gap-[8px] mt-[8px]">
      {!!lastWinner && <WinnerCard type="last" data={lastWinner} />}
      {!!highestWinner && <WinnerCard type="biggest" data={highestWinner} />}
    </div>
  );
}
