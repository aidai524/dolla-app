import clsx from "clsx";
import Market from "@/views/btc/components/more-markets/market";
import ProfileButton from "../../ components/button";
import Empty from "@/components/empty";
import MarketStatus, { EMarketStatus } from "../../ components/market-status";
import dayjs from "dayjs";
import Popover, { PopoverPlacement, PopoverTrigger } from "@/components/popover";
import PopoverCard from "../../ components/popover-card";
import CancelModal from "../cancel-modal";
import { useState } from "react";

const SellerMarkets = (props: any) => {
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
      avatar: "/avatar/1.svg",
      account: "0x1234567890123456789012345678901234567890",
      status: EMarketStatus.Live,
      created_at: "2021-01-01 17:30:00",
    },
    {
      accumulative_bids: "123",
      anchor_price: "100",
      reward_token_info: [],
      nft_ids: "1234",
      reward_amount: "1234",
      value: "1234",
      participants: "1234",
      avatar: "/avatar/1.svg",
      account: "0x1234567890123456789012345678901234567890",
      status: EMarketStatus.Cancelled,
      created_at: "2021-01-02 17:30:00",
    },
    {
      accumulative_bids: "123",
      anchor_price: "100",
      reward_token_info: [],
      nft_ids: "1234",
      reward_amount: "1234",
      value: "1234",
      participants: "1234",
      avatar: "/avatar/1.svg",
      account: "0x1234567890123456789012345678901234567890",
      status: EMarketStatus.Winner,
      created_at: "2021-01-03 17:30:00",
    },
  ];

  const [cancelMarketVisible, setCancelMarketVisible] = useState(false);
  const [cancelMarketOrder, setCancelMarketOrder] = useState({});

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
                <MarketStatus
                  value={item.status}
                  market={item}
                  className="absolute z-[2] left-1/2 -translate-x-1/2 top-[-12px]"
                />
              )}
              footer={(
                <div className="w-full px-[13px] bg-black/20 py-[12px] mt-[20px] relative z-[2] text-white text-center font-[SpaceGrotesk] text-[14px] font-normal leading-[100%]">
                  <div className="flex justify-between items-center gap-[10px]">
                    <div className="text-[#BBACA6]">
                      {dayjs(item.created_at).format("hh:mm D MMM, YYYY")}
                    </div>
                    <div className="flex items-center justify-end gap-[7px]">
                      {
                        item.status === EMarketStatus.Live && (
                          <Popover
                            content={(
                              <PopoverCard className="!w-[244px] text-[#BBACA6] font-[SpaceGrotesk] text-[12px] leading-[120%] font-[400]">
                                <div className="flex items-center gap-[3px]">
                                  <img src="/profile/icon-warning.svg" alt="warning" className="w-[13px] h-[11px] shrink-0" />
                                  <div className="text-[#FFC42F] leading-[100%]">
                                    Be careful!
                                  </div>
                                </div>
                                <div className="mt-[7px]">
                                  If you cancel, platform will refund the bid amount of the player who has already participated, and you need to pay 20% in demages.
                                  For now, it is $94,500 x 0.2 = $18,900
                                </div>
                              </PopoverCard>
                            )}
                            placement={PopoverPlacement.BottomLeft}
                            trigger={PopoverTrigger.Hover}
                            closeDelayDuration={0}
                            offset={30}
                          >
                            <ProfileButton
                              type="default"
                              className="!h-[28px] !px-[11px] !rounded-[8px] !text-[14px] flex items-center gap-[3px]"
                              onClick={() => {
                                setCancelMarketVisible(true);
                              }}
                            >
                              <div className="">Cancel</div>
                              <img src="/profile/icon-warning.svg" alt="warning" className="w-[13px] h-[11px] shrink-0" />
                            </ProfileButton>
                          </Popover>
                        )
                      }

                      {
                        item.status === EMarketStatus.Winner && (
                          <ProfileButton
                            type="primary"
                            className="!h-[28px] !rounded-[8px] !text-[14px]"
                          >
                            Claim
                          </ProfileButton>
                        )
                      }

                      {
                        item.status === EMarketStatus.Cancelled && (
                          <div className="h-[28px] flex items-center justify-end text-[#BBACA6]">Cancelled</div>
                        )
                      }
                    </div>
                  </div>
                </div>
              )}
              onClick={() => { }}
            />
          </div>
        )) : (
          <Empty />
        )
      }
      <CancelModal
        open={cancelMarketVisible}
        onClose={() => {
          setCancelMarketVisible(false);
        }}
        onSuccess={() => {
          setCancelMarketVisible(false);
        }}
        order={cancelMarketOrder}
      />
    </div>
  );
};

export default SellerMarkets;
