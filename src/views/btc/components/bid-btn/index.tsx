import { useBtcContext } from "../../context";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useState } from "react";
import useBid from "@/hooks/solana/use-bid";

export default function BidBtn() {
  const { isFlipping, manualFlip, pool } = useBtcContext();
  const [isHovered, setIsHovered] = useState(false);
  const { onBid, bidding } = useBid(11, (isWinner) => {
    console.log("bidding", isWinner);
  });

  return (
    <AnimatePresence>
      {!isFlipping && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center justify-center w-[200px] h-[200px] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"
        >
          <Circle
            className="w-[254px] h-[254px] pointer-events-none"
            hoverScale={0.85}
            duration={2}
            delay={0}
            isHovered={isHovered}
          />
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              // onBid(pool.id, 1);
              onBid(1);
              manualFlip();
            }}
            className="cursor-pointer w-[200px] h-[200px] flex items-center justify-center absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"
          >
            <span
              className="relative z-[2] text-[40px] text-[#3E2B2B] font-[DelaGothicOne] uppercase"
              style={{
                WebkitTextStroke: "1px #DD9000"
              }}
            >
              Bid!
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"
            >
              <circle
                cx="100"
                cy="100"
                r="100"
                fill="url(#paint0_radial_1634_6263)"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_1634_6263"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(100 138.528) rotate(90) scale(61.4719 100)"
                >
                  <stop stopColor="#FFEF43" />
                  <stop offset="1" stopColor="#FFC42F" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const Circle = ({
  className,
  delay = 0,
  hoverScale = 0.8,
  duration = 2,
  isHovered = false
}: {
  className?: string;
  delay?: number;
  hoverScale?: number;
  duration?: number;
  isHovered?: boolean;
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="258"
      height="258"
      viewBox="0 0 258 258"
      fill="none"
      className={clsx(
        "absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]",
        className
      )}
      animate={{
        scale: isHovered ? hoverScale : [1, 2, 4, 6],
        opacity: isHovered ? 1 : [1, 0]
      }}
      transition={{
        duration: isHovered ? 0.3 : duration,
        delay: delay,
        repeat: isHovered ? 0 : Infinity,
        ease: "linear"
      }}
    >
      <circle
        cx="129"
        cy="129"
        r="127"
        fill="url(#paint0_linear_1634_6262)"
        fillOpacity="0.2"
      />
      <circle
        cx="129"
        cy="129"
        r="128"
        stroke="url(#paint1_linear_1634_6262)"
        strokeOpacity="0.6"
        strokeWidth="2"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1634_6262"
          x1="129"
          y1="2"
          x2="129"
          y2="256"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFC42F" />
          <stop offset="1" stopColor="#FFEF43" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1634_6262"
          x1="129"
          y1="2"
          x2="129"
          y2="256"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFEF43" />
          <stop offset="1" stopColor="#FFEF43" stopOpacity="0" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};
