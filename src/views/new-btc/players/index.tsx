import clsx from "clsx";
import Player from "./player";

export default function Players({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "py-[10px] flex items-center bg-[#0A070B] relative",
        className
      )}
      style={
        {
          // background: "linear-gradient(180deg, #0D0517 0%, #322646 100%)"
        }
      }
    >
      <div className="w-[150px] flex flex-col items-center justify-center text-[#FFEF43] font-[BlackHanSans] border-r border-[#4A376B]">
        <div className="text-[32px] leading-[32px]">1502</div>
        <div className="text-[16px] leading-[16px]">PLAYERS</div>
      </div>
      <div className="flex">
        <Player active={true} />
        <Player />
        <Player />
      </div>
    </div>
  );
}
