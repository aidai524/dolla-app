import clsx from "clsx";
import HeaderBg from "./bg";
import Light from "./light";
import { useBtcContext } from "../../context";
import { formatNumber } from "@/utils/format/number";
import { useMemo } from "react";
import Big from "big.js";

export default function Header({ className }: { className?: string }) {
  const { bids, pool } = useBtcContext();

  const [amount] = useMemo(() => {
    const reward_amount = pool.reward_amount || 0;
    const decimals = pool.reward_token_info?.[0]?.decimals || 1;
    const _a = formatNumber(Big(reward_amount).div(10 ** decimals), 2, true);
    return [_a];
  }, [pool]);

  return (
    <div className={clsx("w-full relative", className)}>
      <HeaderBg className="absolute top-[0px] left-[0px] z-[2] pointer-events-none" />
      {bids === 1 && (
        <Light className="absolute top-[0px] left-[50%] translate-x-[-50%] z-[1] pointer-events-none" />
      )}
      <div
        className="text-[#FFF79E] absolute top-[76px] z-[2] w-full text-center font-[DelaGothicOne]"
        style={{
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor: "#FFF79E"
        }}
      >
        <div className="bg-clip-text relative inline-block text-[62px] bg-[radial-gradient(50%_50%_at_50%_50%,#FFEF43_0%,#FFC42F_100%)]">
          <span
            style={{
              WebkitTextFillColor: "transparent"
            }}
          >
            ${formatNumber(pool.value, 2, true)}
          </span>
          <div className="absolute left-[-180px] top-[-20px] flex items-center gap-[8px]">
            <TriIcon
              className="button"
              onClick={() => {
                console.log(123);
              }}
            />
            <span className="text-[20px] text-[#FFEF43]">0.01 BTC</span>
          </div>
          <div className="absolute right-[-180px] top-[-20px] flex items-center gap-[8px]">
            <span className="text-[20px] text-[#FFEF43]">0.1 BTC</span>
            <TriIcon
              className="rotate-y-[180deg] button"
              onClick={() => {
                console.log(456);
              }}
            />
          </div>
        </div>
        <div />
        <div className="bg-clip-text mt-[-8px] inline-block relative text-[26px] bg-[radial-gradient(50%_50%_at_50%_50%,#FFEF43_0%,#FFC42F_100%)]">
          <span
            style={{
              WebkitTextFillColor: "transparent"
            }}
          >
            1 DOLLA FOR {amount} BTC
          </span>
        </div>
      </div>
    </div>
  );
}

const TriIcon = ({
  className,
  onClick
}: {
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="31"
      height="37"
      viewBox="0 0 31 37"
      fill="none"
      className={className}
      onClick={onClick}
    >
      <g filter="url(#filter0_d_1634_6020)">
        <path
          d="M3.12081 11.7572C0.0208498 14.1593 0.0208507 18.8407 3.12081 21.2428L15.825 31.0868C19.7677 34.1419 25.5 31.3318 25.5 26.344L25.5 6.65601C25.5 1.66817 19.7677 -1.14188 15.825 1.91319L3.12081 11.7572Z"
          fill="url(#paint0_radial_1634_6020)"
        />
        <path
          d="M3.12081 11.7572C0.0208498 14.1593 0.0208507 18.8407 3.12081 21.2428L15.825 31.0868C19.7677 34.1419 25.5 31.3318 25.5 26.344L25.5 6.65601C25.5 1.66817 19.7677 -1.14188 15.825 1.91319L3.12081 11.7572Z"
          stroke="#FFF79E"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1634_6020"
          x="0.295898"
          y="0.144043"
          width="30.7041"
          height="36.7119"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="5" dy="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.218863 0 0 0 0 0.169022 0 0 0 0 0.0431535 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1634_6020"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1634_6020"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_1634_6020"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(16 16.5) scale(19 25.5)"
        >
          <stop stopColor="#FFEF43" />
          <stop offset="1" stopColor="#FFC42F" />
        </radialGradient>
      </defs>
    </svg>
  );
};
