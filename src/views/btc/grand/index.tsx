import clsx from "clsx";
import CannonCoins from "./cannon-coins";

export default function Grand({ className }: { className?: string }) {
  return (
    <div className={clsx("relative", className)}>
      <CannonCoins />
    </div>
  );
}
