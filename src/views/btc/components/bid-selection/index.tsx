import clsx from "clsx";
import AddBtn from "./add-btn";
import { BalanceBg, Bg1, Bg100, Bg10, Bg5, Bg50, ProvablyFairBg } from "./bgs";
import Cashier from "@/sections/cashier/modal";
import { useState } from "react";
import { useBtcContext } from "../../context";

interface BidSelectionProps {
  progress?: number;
}

export default function BidSelection({ progress = 50 }: BidSelectionProps) {
  const circumference = 2 * Math.PI * 50;
  const progressOffset = circumference - (progress / 100) * circumference;
  const [showCashier, setShowCashier] = useState(false);
  const { bids, setBids } = useBtcContext();
  return (
    <div className="absolute bottom-0 left-0 w-full h-[202px] flex items-center justify-center">
      <div className="w-[192px] h-[53px] relative top-[10px] flex items-center justify-center font-[BlackHanSans]">
        <ProvablyFairBg />
        <span className="text-[#FFEF43] text-[16px] mt-[10px] leading-[16px] [text-shadow:_-2px_0_#5E3737,0_2px_#5E3737,2px_0_#5E3737,0_-2px_#5E3737]">
          Provably fair
        </span>
      </div>
      <div className="w-[333px] h-[73px] relative font-[BlackHanSans]">
        <BalanceBg />
        <div className="flex items-center justify-between relative z-[2] mt-[26px] w-[80%] mx-auto">
          <div className="text-[#FFEF43] text-[16px]">BALANCE</div>
          <div className="text-white text-[20px] flex items-center gap-[10px]">
            <span>$2,000</span>
            <AddBtn onClick={() => setShowCashier(true)} />
          </div>
        </div>
      </div>
      <div className="mx-[30px] relative flex flex-col items-center justify-center">
        <div className="relative">
          {/* Circular progress bar */}
          <svg
            className="w-[106px] h-[106px] transform -rotate-90"
            viewBox="0 0 106 106"
          >
            {/* Background circle */}
            <circle
              cx="53"
              cy="53"
              r="50"
              stroke="#4C2D4E99"
              strokeWidth="6"
              fill="none"
              opacity="0.3"
            />
            {/* Progress circle - you can adjust the strokeDasharray to show progress */}
            <circle
              cx="53"
              cy="53"
              r="50"
              stroke="#FFEF43"
              strokeWidth="6"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
            />
          </svg>
          {/* Image in the center */}
          <img
            src="/logo.svg"
            alt=""
            className="w-[84px] h-[84px] rounded-full absolute top-[12px] left-[12px]"
          />
        </div>
        <div className="mt-[30px]">
          <div
            className="text-white text-[20px] leading-[20px] font-[BlackHanSans] text-center"
            style={{
              WebkitTextStrokeWidth: "2px",
              WebkitTextStrokeColor: "#5E3737",
              lineHeight: "100%" // 20px
            }}
          >
            0xdolla
          </div>
          <div className="flex items-center gap-[10px]">
            <span className="text-[14px] text-white">0x25b...2ef2</span>
            <button className="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <path
                  d="M6.03809 2.28809C6.25541 2.28784 6.47105 2.33102 6.67188 2.41406C6.87262 2.49713 7.05537 2.61884 7.20899 2.77246C7.36262 2.92613 7.48434 3.10877 7.56739 3.30957C7.65044 3.51046 7.69265 3.72598 7.69239 3.94336V8.34473C7.70966 9.26031 6.95367 9.99987 6.03809 10H1.6543C1.43696 10.0003 1.22136 9.95805 1.02051 9.875C0.819663 9.79193 0.637089 9.66932 0.483401 9.51562C0.329807 9.36195 0.20802 9.1793 0.125002 8.97852C0.0419817 8.77766 -0.000273377 8.56207 2.37201e-06 8.34473V3.94434C-0.000365337 3.72693 0.0420218 3.51149 0.125002 3.31055C0.208028 3.10956 0.329669 2.92626 0.483401 2.77246C0.637051 2.61879 0.819711 2.49714 1.02051 2.41406C1.22141 2.33097 1.4369 2.28783 1.6543 2.28809H6.03809ZM1.6543 3.34473C1.57566 3.3441 1.4976 3.35892 1.42481 3.38867C1.35188 3.41853 1.28522 3.46283 1.22949 3.51855C1.1738 3.57426 1.12946 3.64096 1.09961 3.71387C1.06988 3.78666 1.05502 3.86473 1.05567 3.94336V8.34473C1.05506 8.42334 1.06985 8.50145 1.09961 8.57422C1.12947 8.64715 1.17377 8.71381 1.22949 8.76953C1.2852 8.82521 1.35192 8.8686 1.42481 8.89844C1.49767 8.92826 1.57557 8.94399 1.6543 8.94336H6.03809C6.11681 8.94398 6.19473 8.92826 6.26758 8.89844C6.34048 8.86859 6.40719 8.82523 6.46289 8.76953C6.51858 8.71384 6.56195 8.64709 6.5918 8.57422C6.62161 8.5014 6.63733 8.42341 6.63672 8.34473V3.94336C6.63736 3.86462 6.62162 3.78675 6.5918 3.71387C6.56196 3.64098 6.51857 3.57426 6.46289 3.51855C6.40717 3.46283 6.34051 3.41853 6.26758 3.38867C6.19479 3.35891 6.11672 3.34411 6.03809 3.34473H1.6543ZM8.37988 0C8.79501 0.000995696 9.19276 0.166432 9.48633 0.459961C9.77986 0.753496 9.94524 1.1513 9.94629 1.56641V6.14355C9.94537 6.55883 9.77997 6.95733 9.48633 7.25098C9.19277 7.54445 8.79498 7.70994 8.37988 7.71094C8.23982 7.71094 8.1049 7.65471 8.00586 7.55566C7.90706 7.45666 7.85156 7.32251 7.85156 7.18262C7.85157 7.04272 7.90704 6.90857 8.00586 6.80957C8.1049 6.71053 8.23982 6.6543 8.37988 6.6543C8.51513 6.65422 8.64456 6.60047 8.74024 6.50488C8.836 6.40912 8.89063 6.27899 8.89063 6.14355V1.56641C8.8905 1.43115 8.83589 1.30171 8.74024 1.20605C8.64455 1.11041 8.51517 1.05671 8.37988 1.05664H3.80274C3.66731 1.05664 3.53717 1.11029 3.44141 1.20605C3.34591 1.30168 3.29212 1.43126 3.29199 1.56641C3.29199 1.70643 3.23668 1.8414 3.1377 1.94043C3.03866 2.03947 2.90374 2.09473 2.76367 2.09473C2.62377 2.09465 2.48959 2.03934 2.39063 1.94043C2.29159 1.84139 2.23633 1.70647 2.23633 1.56641C2.23738 1.1513 2.40276 0.753496 2.69629 0.459961C2.98991 0.16646 3.38758 0.000922396 3.80274 0H8.37988Z"
                  fill="#ADBCCF"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        className="flex items-center text-[#FFEF43] text-[22px] font-normal leading-[100%] uppercase font-[DelaGothicOne]"
        style={{
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor: "#DD9000"
        }}
      >
        <div className="w-[139px] h-[73px] relative flex items-center justify-center button">
          <Bg100 />
          <span
            className={clsx("relative z-[2]", bids === 100 && "text-[#3E2B2B]")}
          >
            $100
          </span>
        </div>
        <div className="w-[133px] h-[68px] relative flex items-center justify-center button">
          <Bg50 />
          <span
            className={clsx("relative z-[2]", bids === 50 && "text-[#3E2B2B]")}
          >
            $50
          </span>
        </div>
        <div className="w-[120px] h-[62px] relative flex items-center justify-center button">
          <Bg10 />
          <span
            className={clsx("relative z-[2]", bids === 10 && "text-[#3E2B2B]")}
          >
            $10
          </span>
        </div>
        <div className="w-[118px] h-[56px] relative flex items-center justify-center button">
          <Bg5 />
          <span
            className={clsx("relative z-[2]", bids === 5 && "text-[#3E2B2B]")}
          >
            $5
          </span>
        </div>
        <div className="w-[110px] h-[47px] relative flex items-center justify-center button">
          {bids === 1 ? <Bg1 /> : <Bg1 />}
          <span
            className={clsx("relative z-[2]", bids === 1 && "text-[#3E2B2B]")}
          >
            $1
          </span>
        </div>
      </div>
      <Cashier open={showCashier} onClose={() => setShowCashier(false)} />
    </div>
  );
}
