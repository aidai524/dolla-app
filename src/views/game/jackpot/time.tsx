import useCountdown, { getTimePeriods, toTwo } from "@/hooks/use-count-down";
import { useMemo } from "react";

export default function Time({ time }: any) {
  const timestamp = useMemo(() => {
    return time ? new Date(time).getTime() / 1000 : 0;
  }, [time]);
  const { secondsRemaining } = useCountdown(timestamp);

  const [minutesArr, secondsArr] = useMemo(() => {
    const { minutes, seconds } = getTimePeriods(secondsRemaining);
    const minutesArr = toTwo(minutes).split("");
    const secondsArr = toTwo(seconds).split("");
    return [minutesArr, secondsArr];
  }, [secondsRemaining]);

  return (
    <div>
      <div className="flex items-center gap-[8px] text-[20px] font-bold">
        <TimeItem num={minutesArr[0]} />
        <TimeItem num={minutesArr[1]} />
        <span className="text-[#EBFF57]">:</span>
        <TimeItem num={secondsArr[0]} />
        <TimeItem num={secondsArr[1]} />
      </div>
      <div className="text-[#ABABAB] text-center font-['SpaceGrotesk'] text-[12px] font-light leading-[100%] mt-[10px] text-right">
        Time Remaining
      </div>
    </div>
  );
}

const TimeItem = ({ num }: { num: string }) => {
  return (
    <div className="w-[38px] h-[42px] bg-[#EBFF57] rounded-[12px] flex items-center justify-center text-black">
      {num}
    </div>
  );
};
