import clsx from "clsx";
import BidsInfo from "./bids-info";
import CannonCoins from "./cannon-coins";

export default function Grand({ className }: { className?: string }) {
  return (
    <div className={clsx("relative", className)}>
      <BidsInfo />
      <CannonCoins />
    </div>
  );
}
