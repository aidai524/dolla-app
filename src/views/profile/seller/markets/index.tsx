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
import Loading from "@/components/icons/loading";
import DepositModal from "../deposit-modal";
import useClaim from "@/hooks/evm/use-claim";
import { formatNumber } from "@/utils/format/number";
import Big from "big.js";

const SellerMarkets = (props: any) => {
  const { className, poolsData, orders, loading, updatePoolsData } = props;

  const [cancelMarketVisible, setCancelMarketVisible] = useState(false);
  const [depositMarketVisible, setDepositMarketVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>();

  return (
    <div className={clsx(
      "w-full grid gap-x-[15px] gap-y-[20px] mt-[25px]",
      orders?.length > 0 ? "grid-cols-3" : "grid-cols-1",
      className
    )}>
      {
        (loading && !orders?.length) ? (
          <div className="py-[100px] flex items-center justify-center">
            <Loading size={20} />
          </div>
        ) : (orders?.length > 0 ? orders.map((item: any, index: number) => {
          const order = poolsData[item];
          return (
            <div key={index} className="relative pt-[12px]">
              <MarketItem
                order={order}
                onDeposit={() => {
                  setCurrentOrder(order);
                  setDepositMarketVisible(true);
                }}
                onCancel={() => {
                  setCurrentOrder(order);
                  setCancelMarketVisible(true);
                }}
                onClaimSuccess={() => {
                  updatePoolsData(order, {
                    is_claim: true
                  });
                }}
              />
            </div>
          );
        }) : (
          <Empty />
        ))
      }
      {
        currentOrder && (
          <>
            <CancelModal
              open={cancelMarketVisible}
              order={currentOrder}
              onClose={() => {
                setCancelMarketVisible(false);
                setCurrentOrder(void 0);
              }}
              onSuccess={() => {
                updatePoolsData(currentOrder.pool_id, {
                  status: EMarketStatus.Cancelled
                });
                setCancelMarketVisible(false);
                setCurrentOrder(void 0);
              }}
            />
            <DepositModal
              open={depositMarketVisible}
              onClose={() => setDepositMarketVisible(false)}
              order={currentOrder}
              onSuccess={() => {
                updatePoolsData(currentOrder?.pool_id, {
                  status: EMarketStatus.Live
                });
                setCurrentOrder(void 0);
                setDepositMarketVisible(false);
              }}
            />
          </>
        )
      }
    </div>
  );
};

export default SellerMarkets;

const MarketItem = (props: any) => {
  const { order, onDeposit, onCancel, onClaimSuccess } = props;

  const { claim, claiming } = useClaim(order.pool_id, () => {
    onClaimSuccess();
  });

  return (
    <Market
      isAcitveBg={false}
      className="!w-full !h-[unset] !bg-[#22201D] !rounded-[16px] !border !border-[#6A5D3A]"
      data={order}
      header={(
        <MarketStatus
          value={order.status}
          market={order}
          className="absolute z-[2] left-1/2 -translate-x-1/2 top-[-12px]"
        />
      )}
      footer={(
        <div className="w-full px-[13px] bg-black/20 py-[12px] mt-[20px] relative z-[2] text-white text-center font-[SpaceGrotesk] text-[14px] font-normal leading-[100%]">
          <div className="flex justify-between items-center gap-[10px]">
            <div className="text-[#BBACA6] whitespace-nowrap">
              {dayjs(order.updated_at).format("hh:mm D MMM, YYYY")}
            </div>
            <div className="flex items-center justify-end gap-[7px]">
              {
                order.status === EMarketStatus.UnDeoposit && (
                  <ProfileButton
                    type="primary"
                    className="!h-[28px] !rounded-[8px] !text-[14px] !px-[5px] !font-[400]"
                    onClick={onDeposit}
                  >
                    Deposit
                  </ProfileButton>
                )
              }

              {
                ![EMarketStatus.Cancelled, EMarketStatus.Winner].includes(order.status) && (
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
                          For now, it is {formatNumber(order.reward_token_price?.[0]?.last_price, 2, true, { prefix: "$" })} x 0.2 = {formatNumber(Big(order.reward_token_price?.[0]?.last_price || 0).times(0.2), 2, true, { prefix: "$" })}
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
                      className="!h-[28px] !px-[7px] !rounded-[8px] !text-[14px] flex items-center gap-[3px]"
                      onClick={onCancel}
                    >
                      <div className="">Cancel</div>
                      <img src="/profile/icon-warning.svg" alt="warning" className="w-[13px] h-[11px] shrink-0" />
                    </ProfileButton>
                  </Popover>
                )
              }

              {
                order.status === EMarketStatus.Winner && (
                  !order.is_claim && (
                    <ProfileButton
                      type="primary"
                      className="!h-[28px] !rounded-[8px] !text-[14px]"
                      onClick={claim}
                      loading={claiming}
                      disabled={claiming}
                    >
                      Claim
                    </ProfileButton>
                  )
                )
              }

              {
                order.is_claim && (
                  <ProfileButton
                    type="default"
                    disabled={true}
                    className="!h-[28px] !rounded-[8px] !text-[14px]"
                  >
                    Claimed
                  </ProfileButton>
                )
              }

              {
                order.status === EMarketStatus.Cancelled && (
                  <div className="h-[28px] flex items-center justify-end text-[#BBACA6]">
                    Cancelled
                  </div>
                )
              }
            </div>
          </div>
        </div>
      )}
    />
  );
};
