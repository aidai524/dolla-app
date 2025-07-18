import { useBtcContext } from "../context";
import FlipCoin from "./flip-coin";
import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import Result from "../components/result";

const SIZE: Record<number, number> = {
  1: 212,
  5: 140,
  10: 130,
  50: 62,
  100: 62
};

export default function FlipCoins() {
  const {
    bids,
    flipStatus,
    pool,
    coinsRef,
    flipComplete,
    bidResult,
    showTicket,
    setShowTicket,
    setFlipStatus,
    onReset
  } = useBtcContext();
  const coinContainerRef = useRef<any>(null);

  const [points, tickets, sumPoints, sumTickets] = useMemo(() => {
    if (!bidResult) {
      return [[0, 100, 200, 500, 1000], ["0", "0", "0", "0", "0"], 0, 0];
    }
    const _p = bidResult.point.wild_coin_ev_result.split(",");
    const _t = bidResult.ticket.result.split(",");
    return [
      _p,
      _t,
      _p.reduce((acc: number, curr: string) => acc + Number(curr), 0),
      _t.reduce((acc: number, curr: string) => acc + Number(curr), 0)
    ];
  }, [bidResult]);

  // console.log(points, tickets);

  return (
    <div
      className="flex items-center justify-center w-full gap-[10px_30px] flex-wrap overflow-y-auto overflow-x-hidden h-full"
      style={{
        maxWidth: (SIZE[bids] + 20) * (bids > 10 ? 11 : 6)
      }}
      ref={coinContainerRef}
    >
      {new Array(bids).fill(0).map((_, index) => (
        <FlipCoin
          key={pool.id + "_" + index + "_" + bids}
          size={SIZE[bids]}
          points={points[index] || 0}
          ticket={tickets[index] || 0}
          disabled={flipStatus !== 4 && flipStatus !== 5}
          bids={bids}
          index={index}
          ref={(el) => {
            coinsRef.current[index] = el;
          }}
          onFlipComplete={flipComplete}
          coinContainerRef={coinContainerRef}
          setShowTicket={setShowTicket}
        />
      ))}
      {showTicket && (
        <motion.img
          src="/btc/ticket.png"
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[274px] h-[187px]"
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: -120,
            opacity: 0
          }}
          transition={{
            y: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            },
            opacity: {
              duration: 0.8,
              ease: "easeOut"
            }
          }}
          onAnimationComplete={() => {
            setShowTicket(false);
          }}
        />
      )}
      {flipStatus === 6 && (
        <Result
          points={sumPoints}
          tickets={sumTickets}
          onClose={() => {
            setFlipStatus(0);
            onReset();
          }}
        />
      )}
    </div>
  );
}
