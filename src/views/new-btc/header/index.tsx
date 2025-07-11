import clsx from "clsx";
import HeaderBg from "./bg";
import ShareBtn from "./share-btn";
import WildTime from "./wild-time";
import Progress from "./progress";

export default function Header({ className }: { className?: string }) {
  return (
    <div className={clsx("w-full h-[202px] relative", className)}>
      <HeaderBg className="absolute top-0 left-0 z-[2] pointer-events-none" />
      <div
        className="text-[#FFF79E] absolute top-[10px] z-[2] w-full text-center font-[DelaGothicOne] pointer-events-none"
        style={{
          WebkitTextFillColor: "transparent",
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor: "#FFF79E"
        }}
      >
        <div className="bg-clip-text inline-block relative text-[42px] bg-[radial-gradient(50%_50%_at_50%_50%,#FFEF43_0%,#FFC42F_100%)]">
          <span>1 DOLLA FOR</span>
          <TriIcon className="absolute top-[16px] left-[-50px] rotate-y-[180deg]" />
          <TriIcon className="absolute top-[16px] right-[-50px]" />
        </div>
        <div />
        <div className="bg-clip-text mt-[-32px] inline-block text-[80px] bg-[radial-gradient(50%_50%_at_50%_50%,#FFEF43_0%,#FFC42F_100%)]">
          <span>0.1 BTC</span>
          <Progress progress={80} />
        </div>
      </div>
      <div className="absolute w-[40vw] h-[66px] bg-black/40 rotate-[6deg] left-[0px] bottom-[60px] font-[SpaceGrotesk]">
        <div className="flex items-center justify-around px-[10%] absolute left-0 bottom-[8px] w-[35vw]">
          <div className="flex items-center gap-[8px]">
            <img
              src="/images/new-btc/header/icon-1.png"
              className="w-[32px] h-[32px] rounded-[6px] border border-[2px] border-white/40"
            />
            <div>
              <div className="text-[#FFE9B2] text-[12px]">Provider</div>
              <div className="text-white text-[14px]">0xdolla</div>
            </div>
          </div>
          <div>
            <div className="text-[#FFE9B2] text-[12px]">Players</div>
            <div className="text-white text-[14px]">0xdolla</div>
          </div>
          <div>
            <div className="text-[#FFE9B2] text-[12px]">Bid</div>
            <div className="text-white text-[14px]">0xdolla</div>
          </div>
        </div>
      </div>
      <div className="absolute w-[40vw] h-[66px] bg-black/40 rotate-[-6deg] right-[-10px] bottom-[60px] font-[SpaceGrotesk]">
        <div className="flex items-center justify-between absolute right-0 bottom-[8px] w-[35vw] pl-[2vw] pr-[4vw]">
          <WildTime />
          <ShareBtn />
        </div>
      </div>
    </div>
  );
}

const TriIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="31"
      height="37"
      viewBox="0 0 31 37"
      fill="none"
      className={className}
    >
      <g filter="url(#filter0_d_1532_20513)">
        <path
          d="M22.8792 11.7572C25.9792 14.1593 25.9791 18.8407 22.8792 21.2428L10.175 31.0868C6.23231 34.1419 0.500002 31.3318 0.500002 26.344L0.500003 6.65601C0.500003 1.66817 6.23231 -1.14188 10.175 1.91319L22.8792 11.7572Z"
          fill="url(#paint0_radial_1532_20513)"
        />
        <path
          d="M22.8792 11.7572C25.9792 14.1593 25.9791 18.8407 22.8792 21.2428L10.175 31.0868C6.23231 34.1419 0.500002 31.3318 0.500002 26.344L0.500003 6.65601C0.500003 1.66817 6.23231 -1.14188 10.175 1.91319L22.8792 11.7572Z"
          stroke="#FFF79E"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1532_20513"
          x="0"
          y="0.144043"
          width="30.7041"
          height="36.7119"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
            result="effect1_dropShadow_1532_20513"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1532_20513"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_1532_20513"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10 16.5) rotate(-180) scale(19 25.5)"
        >
          <stop stop-color="#FFEF43" />
          <stop offset="1" stop-color="#FFC42F" />
        </radialGradient>
      </defs>
    </svg>
  );
};
