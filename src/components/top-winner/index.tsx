import Avatar from "../avatar";
import UserLevel from "../user-level";
import BoostTag from "../tags/boost";
import clsx from "clsx";

interface TopWinnerProps {
  className?: string;
}

export default function TopWinner({ className = "" }: TopWinnerProps) {
  return (
    <div
      className={clsx(
        "h-[36px] pr-[36px] pl-[13px] text-[12px] text-white border border-[#434343CC] rounded-[20px]",
        className
      )}
    >
      <div
        className="absolute rounded-[20px] inset-0"
        style={{
          background:
            "radial-gradient(37.2% 100% at 50% 0%, rgba(235, 255, 87, 0.30) 0%, rgba(0, 0, 0, 0.00) 100%), #191817"
        }}
      />
      <div className="relative h-full backdrop-blur-sm flex items-center gap-[8px] ">
        <span>Top Winner</span>
        <Avatar size={32} />
        <span>Zac001</span>
        <UserLevel level={8} />
      </div>
      <BoostTag
        size="small"
        boost={120}
        className="absolute right-[-15px] top-[-8px]"
      />
    </div>
  );
}
