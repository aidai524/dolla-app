import clsx from "clsx";
import BTCIcon from "./btc-icon";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import { formatNumber } from "@/utils/format/number";
import Big from "big.js";
import { formatAddress } from "@/utils/format/address";
import { getAnchorPrice } from "@/utils/pool";

export default memo(function BTCTop({ data }: { data: any }) {
  const coins = useMemo(() => {
    if (!data.reward_amount) return [0, 0, 0, 0];
    const amount = Big(data.reward_amount)
      .div(10 ** data.reward_token_info?.[0]?.decimals)
      .toNumber();
    if (amount < 0.001) return [2, 2, 3, 3];
    if (amount < 0.01) return [4, 5, 5, 6];
    if (amount < 0.1) return [6, 7, 8, 9];
    return [10, 10, 10, 10];
  }, [data]);
  return (
    <div className="h-[294px] w-[928px] mx-auto relative pt-[36px]">
      <Tips className="top-[25px] left-[86px]" data={data} />
      <div className="absolute top-0 left-[50%] translate-x-[-50%] bg-[url('/btc/btc-light.png')] bg-cover bg-center bg-no-repeat w-[614px] h-[294px]" />
      <div className="absolute bottom-[60px] left-[50%] translate-x-[-50%]">
        <Coins len={coins[0]} className="left-[-100px] z-[5]" />
        <Coins len={coins[1]} className="z-[5]" />
        <Coins len={coins[2]} className="left-[100px] z-[5]" />
        <Coins len={coins[3]} className="bottom-[50px] left-[50px] z-[1]" />
      </div>
    </div>
  );
});

export const Coins = ({
  len,
  className
}: {
  len: number;
  className?: string;
}) => {
  return (
    <div className={clsx("absolute bottom-0 flex items-center", className)}>
      <div className="relative z-[2]">
        {new Array(len).fill(0).map((_, index) => (
          <motion.div
            key={index}
            initial={{
              y: -100,
              opacity: 0,
              x: 0
            }}
            animate={{
              y: index !== len - 1 ? (len - 1 - index) * 30 : 0,
              opacity: 1,
              x: Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1)
            }}
            transition={{
              delay: (len - index) * 0.1,
              duration: index * 0.05,
              ease: "easeIn"
            }}
            style={{
              position: "relative",
              zIndex: len - index
            }}
          >
            <BTCIcon className="relative" />
          </motion.div>
        ))}
      </div>
      {len > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <CoinShadow className="absolute bottom-0 left-[20px] z-[1]" />
        </motion.div>
      )}
    </div>
  );
};

export const Tips = ({
  className,
  data
}: {
  className?: string;
  data: any;
}) => {
  const amount = useMemo(() => {
    if (!data.reward_amount) return "-";
    return formatNumber(
      Big(data.reward_amount).div(10 ** data.reward_token_info[0].decimals),
      2,
      true
    );
  }, [data]);
  return (
    <div className={clsx("absolute w-[284px] h-[166px]", className)}>
      <div className="relative w-[234px] h-full z-[2] flex flex-col justify-center items-center">
        <div className="text-[42px] font-semibold text-transparent bg-clip-text bg-[radial-gradient(50%_50%_at_50%_50%,#FFEF43_0%,#FFC42F_100%)] [text-shadow:0px_0px_6px_#FFC42F]">
          ${formatNumber(getAnchorPrice(data), 2, true)}
        </div>
        <div className="text-[20px] font-bold">
          {amount} {data.reward_token_info?.[0].symbol}
        </div>
        <div className="flex items-center text-[14px] mt-[10px]">
          <span className="text-[#ADBCCF] mr-[8px]">Provider:</span>
          {data.user_info?.icon && (
            <img
              src={data.user_info?.icon}
              className="w-[22px] h-[22px] rounded-[8px] border-2 border-white/80 mr-[10px] shrink-0"
            />
          )}
          <span className="text-white">{formatAddress(data.user)}</span>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="280"
        height="166"
        viewBox="0 0 280 166"
        fill="none"
        className="absolute top-0 left-0"
      >
        <path
          d="M10 0.5H219C224.247 0.5 228.5 4.7533 228.5 10V61.834C228.5 62.6786 228.926 63.4618 229.626 63.9219L229.77 64.0098L277.827 91.1943C279.169 91.9534 278.63 93.9999 277.089 94H231C229.619 94 228.5 95.1193 228.5 96.5V156C228.5 161.247 224.247 165.5 219 165.5H10C4.7533 165.5 0.5 161.247 0.5 156V10C0.500002 4.7533 4.7533 0.5 10 0.5Z"
          fill="#222A35"
          stroke="url(#paint0_linear_591_6862)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_591_6862"
            x1="284.687"
            y1="63"
            x2="0"
            y2="63"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#99761D" />
            <stop offset="1" stopColor="#FFC430" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const CoinShadow = ({ className }: { className?: string }) => {
  return (
    <svg
      width="82"
      height="31"
      viewBox="0 0 82 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse
        cx="41.1896"
        cy="15.7617"
        rx="40.3732"
        ry="15.1831"
        fill="black"
        fillOpacity="0.3"
      />
    </svg>
  );
};
