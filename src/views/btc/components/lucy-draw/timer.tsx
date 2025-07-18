import useCountdown, { getTimePeriods, toTwo } from "@/hooks/use-count-down";

export default function Timer() {
  const { secondsRemaining } = useCountdown(1752897600000);
  const { hours, minutes, seconds } = getTimePeriods(secondsRemaining);

  return (
    <div className="w-[208px] h-[30px] mt-[8px] mx-auto text-center text-[18px] text-white flex items-center justify-center gap-[8px] font-[BlackHanSans] rounded-[8px] border border-[#FFE9B2] bg-[#FFFFFF1A] backdrop-filter-[10px]">
      <span>{toTwo(hours)}</span>
      <span className="mt-[1px]">:</span>
      <span>{toTwo(minutes)}</span>
      <span className="mt-[1px]">:</span>
      <span>{toTwo(seconds)}</span>
    </div>
  );
}
