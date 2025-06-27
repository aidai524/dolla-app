import clsx from "clsx";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function BidTips({ num, from }: { num: number; from: string }) {
  const bidRef = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={bidRef}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        "absolute h-[25px] w-auto flex items-center justify-center z-[6] pl-[22px]",
        from === "list"
          ? "right-[10px] bottom-[112px]"
          : "right-[20px] bottom-[190px]"
      )}
      onAnimationComplete={() => {
        setTimeout(() => {
          if (bidRef.current) {
            bidRef.current.animate([{ opacity: 1 }, { opacity: 0 }], {
              duration: 1,
              fill: "forwards"
            });
          }
        }, 3000);
      }}
    >
      <div className="text-black relative z-[2] text-[12px] italic">
        Just Bid <span className="font-bold">x</span>
        <span className="font-bold text-[16px]">{num}</span>
      </div>
      <img
        className="absolute top-[-18px] left-[-10px] w-[44px] h-[44px] z-[1]"
        src="/1-dollar-win/bid-fire.gif"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#EBFF57] from-[80%] to-transparent rounded-[2px_0px_0px_2px] skew-x-[-15deg]" />
    </motion.div>
  );
}
