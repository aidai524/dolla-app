import { useMemo } from "react";
import Label from "./label";
import { formatNumber } from "@/utils/format/number";
import { getAnchorPrice } from "@/utils/pool";

export default function NFTTop({ data }: any) {
  const [type, rewardToken] = useMemo(() => {
    let _type = "basic";
    if (Number(data?.rare) === 1) _type = "saudi";
    if (Number(data?.rare) === 2) _type = "redOg";
    return [_type, data?.reward_token_info?.[0]];
  }, [data]);

  const anchorPrice = useMemo(() => {
    return getAnchorPrice(data);
  }, [data]);

  return (
    <div className="flex justify-center gap-[52px]">
      <div className="w-[245px] h-[245px] relative">
        {rewardToken?.icon && (
          <img
            src={rewardToken?.icon}
            className="w-full h-full rounded-[6px] border border-white bg-[radial-gradient(50%_50%_at_50%_50%,#FFEF43_0%,#FFC42F_100%)] shadow-[0px_0px_6px_0px_#FFC42F]"
          />
        )}

        <Label type={type} />
      </div>
      <div>
        <div className="text-[20px] font-bold">{rewardToken?.name}</div>
        <div className="mt-[8px]">
          <div className="h-[40px] rounded-[6px] bg-[#222A35] px-[13px] text-[14px] text-[#ADBCCF] inline-flex items-center gap-[20px]">
            <div>Anchor Price</div>
            <div className="text-right text-[20px] font-semibold leading-[100%] font-montserrat bg-gradient-to-r from-[#FFEF43] to-[#FFC42F] bg-clip-text text-transparent drop-shadow-[0_0_6px_#FFC42F]">
              ${anchorPrice ? formatNumber(anchorPrice, 2, true) : "-"}
            </div>
          </div>
        </div>
        <div>
          <div className="h-[40px] rounded-[6px] bg-[#222A35] px-[13px] text-[14px] text-[#ADBCCF] inline-flex items-center gap-[16px] mt-[16px]">
            <div>Rare</div>
            <div className="flex items-center gap-[2px]">
              {new Array(6 - (Number(data?.rare) || 5))
                .fill(0)
                .map((item: any) => (
                  <StartIcon key={item + Math.random()} />
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="h-[40px] rounded-[6px] bg-[#222A35] px-[13px] text-[14px] text-[#ADBCCF] inline-flex items-center gap-[16px] mt-[16px]">
            <div>Accumulative Bids</div>
            <div className="font-bold text-white">
              ${formatNumber(data?.accumulative_bids, 2, true)}
            </div>
          </div>
        </div>
        <div>
          <div className="h-[40px] rounded-[6px] bg-[#222A35] px-[13px] text-[14px] text-[#ADBCCF] inline-flex items-center gap-[16px] mt-[16px]">
            <div>Participants</div>
            <div className="font-bold text-white">
              {formatNumber(data?.participants, 0, true)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StartIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
    >
      <path
        d="M7.81718 6.25362C7.63348 6.59613 7.35709 6.81855 7.06599 6.84889L2.74143 7.47619C1.07456 7.75354 0.416726 9.8317 1.60549 11.0685L4.71512 14.1992C4.96541 14.4597 5.08416 14.8109 5.0229 15.129L4.27001 19.5674C4.00312 21.3016 5.73619 22.6152 7.20532 21.7814L11.051 19.7034C11.3628 19.5235 11.6795 19.5235 11.9789 19.6962L15.8459 21.7866C17.3062 22.6152 19.0392 21.3016 18.7738 19.5756L18.0215 15.1405C17.9896 14.7937 18.1018 14.4337 18.3331 14.1932L21.431 11.0744C22.6257 9.83165 21.9678 7.75352 20.3109 7.47775L15.9958 6.85133C15.6525 6.77892 15.3549 6.5565 15.2326 6.27017L13.3229 2.19143C12.5922 0.602294 10.4501 0.602294 9.71782 2.19481L7.81718 6.25362Z"
        fill="url(#paint0_linear_583_2573)"
        stroke="black"
      />
      <path
        d="M11.3259 1.82856C11.3742 1.6229 11.667 1.62289 11.7153 1.82856L13.3487 8.7796C13.3713 8.87608 13.4613 8.94141 13.56 8.93315L20.6776 8.33809C20.8882 8.32048 20.9786 8.59895 20.7979 8.70844L14.6899 12.4092C14.6051 12.4605 14.5708 12.5663 14.6092 12.6577L17.3747 19.2407C17.4566 19.4355 17.2197 19.6076 17.0597 19.4696L11.6512 14.8059C11.5762 14.7412 11.465 14.7412 11.39 14.8059L5.98148 19.4696C5.82147 19.6076 5.58465 19.4355 5.66648 19.2407L8.43205 12.6577C8.47045 12.5663 8.43609 12.4605 8.3513 12.4092L2.2433 8.70844C2.06258 8.59895 2.15304 8.32048 2.3636 8.33809L9.48118 8.93315C9.57995 8.94141 9.66987 8.87608 9.69254 8.7796L11.3259 1.82856Z"
        fill="#FFE5B4"
      />
      <defs>
        <linearGradient
          id="paint0_linear_583_2573"
          x1="3.10412"
          y1="1"
          x2="18.885"
          y2="22.0412"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDB97" />
          <stop offset="0.555872" stopColor="#CE9325" />
          <stop offset="1" stopColor="#FFCD71" />
        </linearGradient>
      </defs>
    </svg>
  );
};
