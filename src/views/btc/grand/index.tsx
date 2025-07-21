import clsx from "clsx";
// import CannonCoins from "./cannon-coins";
import FlipCoins from "./flip-coins";
import { useBtcContext } from "../context";
import FlippingCoin from "../components/fliping-coin";
import PreLoading from "./pre-loading";

export default function Grand({ className }: { className?: string }) {
  const { flipStatus, pool } = useBtcContext();

  return (
    pool?.status === 1 && (
      <div
        className={clsx(
          "relative w-[calc(100vw-620px)] flex items-center justify-center mx-auto overflow-hidden",
          className
        )}
      >
        <FlipCoins />

        {flipStatus === 3 && <FlippingCoin start={true} />}
        {flipStatus === 1 && <PreLoading />}
      </div>
    )
  );
}
