import clsx from "clsx";
import Market from "@/views/btc/components/more-markets/market";
import ProfileButton from "../../ components/button";
import Empty from "@/components/empty";

const PlayerMarkets = (props: any) => {
  const { className } = props;

  const data: any = [
    {
      accumulative_bids: "123",
      anchor_price: "100",
      reward_token_info: [],
      nft_ids: "1234",
      reward_amount: "1234",
      value: "1234",
      participants: "1234",
    }
  ];

  return (
    <div className={clsx(
      "w-full grid gap-x-[15px] gap-y-[20px] mt-[25px]",
      data?.length > 0 ? "grid-cols-3" : "grid-cols-1",
      className
    )}>
      {
        data?.length > 0 ? data.map((item: any, index: number) => (
          <div key={index} className="relative pt-[12px]">
            <Market
              isAcitveBg={false}
              className="!w-full !h-[unset] !bg-[#22201D] !rounded-[16px] !border !border-[#6A5D3A]"
              data={item}
              header={(
                <div className="absolute z-[2] left-1/2 -translate-x-1/2 top-[-12px] rounded-[10px] pl-[20px] pr-[23px] h-[24px] shrink-0 border border-[#6A5D3A] font-[SpaceGrotesk] font-[14px] bg-black/20 backdrop-blur-[5px] text-white font-[500] flex justify-center items-center gap-[7px]">
                  <div className="w-[9px] h-[9px] flex-shrink-0 bg-[#54FF59] rounded-full" />
                  <div className="">Live</div>
                </div>
              )}
              footer={(
                <div className="w-full px-[13px] bg-black/20 py-[17px] mt-[20px] relative z-[2] text-white text-center font-[SpaceGrotesk] text-[14px] font-normal leading-[100%]">
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
                </div>)}
              onClick={() => { }}
            />
          </div>
        )) : (
          <Empty />
        )
      }
    </div>
  );
};

export default PlayerMarkets;
