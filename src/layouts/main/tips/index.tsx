import TipsBid from "./bid";
import clsx from "clsx";

export default function Tips({
  className,
  purchase
}: {
  className?: string;
  purchase: any;
}) {
  return (
    <div className={clsx("flex items-center gap-[10px]", className)}>
      {/* {winner && <TipsWon data={winner} />} */}
      {purchase && <TipsBid data={purchase} />}
    </div>
  );
}
