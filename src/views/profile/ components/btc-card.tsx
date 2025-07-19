import { formatAddress } from "@/utils/format/address";
import clsx from "clsx";
import ProfileButton from "./button";

const BTCCard = (props: any) => {
  const { className, containerClassName } = props;

  const progress = 100;

  return (
    <div className={clsx("relative pt-[12px]", containerClassName)}>
      <div className="absolute z-[2] left-1/2 -translate-x-1/2 top-0 rounded-[10px] pl-[20px] pr-[23px] h-[24px] shrink-0 border border-[#6A5D3A] font-[SpaceGrotesk] font-[14px] bg-black/20 backdrop-blur-[5px] text-white font-[500] flex justify-center items-center gap-[7px]">
        <div className="w-[9px] h-[9px] flex-shrink-0 bg-[#54FF59] rounded-full" />
        <div className="">Live</div>
      </div>
      <div
        className={clsx(
          "relative z-[1] overflow-hidden rounded-[16px] border border-[#6A5D3A] bg-[#22201D] text-white text-center font-[SpaceGrotesk] text-[14px] font-normal leading-[100%] shadow-[0px_1px_0px_#000] ",
          className
        )}
      >
        <div className="w-full px-[12px] py-[20px]">
          <div className="flex justify-between items-center gap-[10px]">
            <div className="flex items-center gap-[6px]">
              <img
                src="/avatar/1.svg"
                alt=""
                className="w-[22px] h-[22px] rounded-[4px] border border-[rgba(255,255,255,0.8)] shrink-0 object-center object-contain"
              />
              <div className="">
                {formatAddress("0x1234567890123456789012345678901234567890")}
              </div>
            </div>
            <div className="text-[#BBACA6] text-[12px]">
              #0124
            </div>
          </div>
          <div className="mt-[6px] flex justify-center text-center font-[DelaGothicOne] text-[#FFC42F] text-[26px] font-normal leading-[90%] [-webkit-text-stroke-color:#FFF79E] [-webkit-text-stroke-width:1px] [text-shadow:5px_4px_0px_#382B0B,1px_0px_0px_#FFF79E]">
            1 BTC
          </div>
          <div className="flex justify-center mt-[12px] text-[#FFEF43] text-[16px] font-[Montserrat] font-[600]">
            $117,600
          </div>
          <div className="flex justify-between items-center gap-[10px] text-[#BBACA6] mt-[16px]">
            <div className="flex items-center gap-[5px]">
              <img
                src="/profile/icon-joiner.svg"
                alt=""
                className="w-[14px] h-[17px] object-center object-contain shrink-0"
              />
              <div className="">
                357
              </div>
            </div>
            <div className="flex items-center gap-[5px]">
              <img
                src="/profile/icon-tvl.svg"
                alt=""
                className="w-[14px] h-[17px] object-center object-contain shrink-0"
              />
              <div className="">
                $117,685
              </div>
            </div>
          </div>
          <div className="w-full h-[3px] rounded-[2px] bg-black/50 mt-[15px]">
            <div
              className={clsx(
                "h-full rounded-[2px] shadow-[0_0_6px_0_#FFC42F]",
                progress >= 100 ? "bg-[linear-gradient(270deg,_#FFC42F_0%,_#FF43E0_54.81%,_#53EABF_100%)]" : "bg-[radial-gradient(50%_50%_at_50%_50%,#FFEF43_0%,#FFC42F_100%)]"
              )}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
        <div className="w-full px-[13px] bg-black/20 py-[17px]">
          <div className="flex justify-between items-center gap-[10px]">
            <div className="text-[#BBACA6]">
              You bid / Refund
            </div>
            <div className="flex items-center justify-end gap-[7px]">
              <ProfileButton
                type="default"
                className="!h-[24px] !rounded-[12px] !px-[10px] !text-[#BBACA6]"
              >
                Claim
              </ProfileButton>
              <div className="">
                $200
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BTCCard;
