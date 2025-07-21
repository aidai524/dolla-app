export default function WinResult({
  onShowHistory
}: {
  onShowHistory: (round: number) => void;
}) {
  return (
    <div className="w-[250px] h-[104px] rounded-[12px] bg-linear-to-b from-[#4FFF61] to-[#2F993A] text-black py-[6px] px-[10px] mb-[10px]">
      <div className="text-[18px] font-[DelaGothicOne]">Congrats! </div>
      <div className="text-[14px] font-[DelaGothicOne]">
        You won $50 from Lucky Draw #01.{" "}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="text-[12px] underline button"
          onClick={() => {
            onShowHistory(1);
          }}
        >
          Winning Result
        </button>
        <button
          onClick={() => {}}
          className="button w-[72px] h-[24px] bg-linear-to-b from-[#FFF698] to-[#FFC42F] rounded-[8px] text-[12px]"
        >
          Claim
        </button>
      </div>
    </div>
  );
}
