import clsx from "clsx";
import RocketIcon from "./rocket-icon";

export default function DailyCase({ active }: any) {
  return (
    <div
      className={clsx(
        "h-[36px] border border-[#555C1F] bg-[#EBFF571F] rounded-[12px] relative flex items-center pl-[36px] pr-[13px]",
        !active && "grayscale"
      )}
    >
      <RocketIcon
        className="absolute left-[-8px] bottom-[-8px]"
        active={active}
      />
      {active ? (
        <span className="text-[#EBFF57] font-bold text-[12px] text-shadow-[0px 0px 10px rgba(235,_255,_87,_0.60)]">
          Daily Case
        </span>
      ) : (
        <span className="text-[#ABABAB] font-bold text-[12px]">
          23 : 36 : 42
        </span>
      )}
    </div>
  );
}
