import clsx from "clsx";
import { motion } from "framer-motion";
import { formatNumber } from "@/utils/format/number";
import { useMemo } from "react";
import Big from "big.js";

export default function Market({
  data,
  className,
  footer,
  onClick = () => {}
}: {
  data: any;
  className?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
}) {
  const progress = useMemo(() => {
    if (!data.accumulative_bids || data.anchor_price === "0") return 0;
    return (data.accumulative_bids / data.anchor_price) * 100;
  }, [data]);
  const rewardTokenInfo = useMemo(() => {
    return data.reward_token_info?.[0] || {};
  }, [data]);

  return (
    <div
      className={clsx(
        "w-[280px] h-[142px] rounded-[6px] border border-transparent hover:border-[#99761D] bg-[#222A35] mt-[12px] transition-all duration-300",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between pt-[14px] px-[12px]">
        <div className="flex items-center gap-[6px]">
          {rewardTokenInfo.icon && (
            <img
              src={rewardTokenInfo.icon}
              className="w-[20px] h-[20px] rounded-[4px] border border-white/80"
            />
          )}

          <span className="text-[14px] text-white">{rewardTokenInfo.name}</span>
        </div>
        {data?.nft_ids && (
          <span className="text-[12px] text-[#ADBCCF]">#{data?.nft_ids}</span>
        )}
      </div>
      <div className="mt-[10px] mx-[6px] h-[40px] rounded-[6px] bg-[#191E27] flex items-center justify-between px-[6px]">
        <span className="text-[16px] font-bold">
          {data?.nft_ids
            ? 1
            : rewardTokenInfo && data?.reward_amount
            ? formatNumber(
                Big(data.reward_amount || 0).div(
                  10 ** rewardTokenInfo.decimals
                ),
                3,
                true
              )
            : "-"}{" "}
          {rewardTokenInfo.symbol}{" "}
        </span>
        <span className="text-[16px] font-semibold text-transparent bg-clip-text bg-[radial-gradient(50%_50%_at_50%_50%,#FFEF43_0%,#FFC42F_100%)] [text-shadow:0px_0px_6px_#FFC42F]">
          {formatNumber(data.value, 0, true, {
            prefix: "$"
          })}
        </span>
      </div>
      <div className="px-[12px] mt-[9px] flex items-center justify-between text-[14px] text-[#ADBCCF]">
        <div className="flex items-center gap-[5px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="17"
            viewBox="0 0 14 17"
            fill="none"
          >
            <path
              d="M6.86573 0.00380844C8.8672 0.0525198 10.462 0.660656 11.6509 1.82803C12.8397 2.99535 13.4115 4.52013 13.3657 6.40322C13.3208 8.24724 12.6764 9.72373 11.4321 10.8319C10.9279 11.281 10.3605 11.6324 9.73194 11.8915C11.3338 12.6929 11.9806 14.1059 12.0366 14.9433C12.0366 14.9433 10.2182 16.1053 6.82569 16.1054C3.44186 16.1054 1.81075 14.9493 1.80225 14.9433C1.96423 14.1341 2.53475 12.7883 3.98487 11.9755C3.12226 11.6708 2.36685 11.2116 1.71924 10.5956C0.530324 9.42821 -0.0424371 7.92205 0.00244628 6.07803C0.0483743 4.19509 0.693916 2.6998 1.93799 1.5917C3.22155 0.48445 4.8642 -0.044881 6.86573 0.00380844Z"
              fill="#ADBCCF"
            />
            <path
              d="M4.26904 3.96191L4.26904 5.61073"
              stroke="black"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M9.81982 4.2912L8.22674 4.71794"
              stroke="black"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M4.43506 8.08392C5.75448 8.90833 8.55826 8.74345 9.87769 6.92975"
              stroke="black"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <span>{data.participants}</span>
        </div>
        <div className="flex items-center gap-[5px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
          >
            <path
              d="M12.8975 12.0449C12.9037 12.6813 9.87782 14 6.36328 14C2.8488 14 0 12.7272 0 12.0908L0.00585938 10.1816C0.723974 10.6059 2.99593 11.4541 6.36328 11.4541C9.73069 11.4541 12.1793 10.818 12.8975 10.1816V12.0449ZM12.8975 7.59082C12.9035 8.2272 9.87775 9.5459 6.36328 9.5459C2.84937 9.54587 0.000930709 8.27318 0 7.63672L0.00585938 5.72754C0.723974 6.15178 2.99593 6.99998 6.36328 7C9.7304 7 12.1791 6.36385 12.8975 5.72754V7.59082ZM6.37012 0C9.88453 5.75454e-05 12.7334 1.14012 12.7334 2.5459C12.7328 3.95147 9.88416 5.09076 6.37012 5.09082C2.85595 5.09082 0.0064589 3.95151 0.00585938 2.5459C0.00585938 1.14008 2.85558 0 6.37012 0Z"
              fill="#ADBCCF"
            />
          </svg>
          <span>
            {formatNumber(data.accumulative_bids, 0, true, {
              prefix: "$"
            })}
          </span>
        </div>
      </div>
      <div className="mt-[12px] h-[3px] rounded-[6px] bg-[#191E27] relative mx-[11px]">
        <div
          className="h-full absolute left-0 top-0 rounded-[6px] shadow-[0px_0px_6px_0px_#FFC42F]"
          style={{
            background:
              progress >= 100
                ? "linear-gradient(270deg, #FFC42F 0%, #FF43E0 54.81%, #53EABF 100%)"
                : "radial-gradient(50% 50% at 50% 50%, #FFEF43 0%, #FFC42F 100%)",
            width: `${Math.min(progress, 100)}%`
          }}
        >
          {progress >= 80 && progress < 100 && (
            <>
              <motion.div
                className="absolute right-0 top-[-3px] w-[4px] h-[2px] bg-[#FFC42F] rounded-full rotate-45"
                initial={{ x: 0, opacity: 0 }}
                animate={{
                  x: [-2, -16, -2],
                  opacity: [1, 0.6, 1]
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              />
              <motion.div
                className="absolute right-0 bottom-[-3px] w-[4px] h-[2px] bg-[#FFC42F] rounded-full rotate-[-45deg]"
                initial={{ x: 0, opacity: 0 }}
                animate={{
                  x: [-2, -16, -2],
                  opacity: [0.6, 0.4, 0.6]
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              ></motion.div>
            </>
          )}
        </div>
      </div>
      {footer}
    </div>
  );
}
