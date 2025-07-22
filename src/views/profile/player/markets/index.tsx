import clsx from "clsx";
import Market from "@/views/btc/components/more-markets/market";
import ButtonV2 from "@/components/button/v2";
import Empty from "@/components/empty";
import MarketStatus, { EMarketStatus } from "../../ components/market-status";
import Loading from "@/components/icons/loading";

const PlayerMarkets = (props: any) => {
  const {
    className,
    poolsData,
    orders,
    loading,
  } = props;

  return (
    <div className={clsx(
      "w-full grid gap-x-[15px] gap-y-[20px] mt-[25px]",
      orders?.length > 0 ? "grid-cols-3" : "grid-cols-1",
      className
    )}>
      {
        (loading && !orders?.length) ? (
          <div className="w-full py-[100px] flex justify-center items-center">
            <Loading size={16} />
          </div>
        ) : orders?.length > 0 ? orders.map((item: any, index: number) => {
          const order = poolsData[item];
          return (
            <div key={index} className="relative pt-[12px]">
              <MarketItem
                order={order}
              />
            </div>
          );
        }) : (
          <Empty />
        )
      }
    </div>
  );
};

export default PlayerMarkets;

const MarketItem = (props: any) => {
  const {
    order,
  } = props;

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
        <div className="w-full px-[13px] bg-black/20 py-[17px] mt-[20px] relative z-[2] text-white text-center font-[SpaceGrotesk] text-[14px] font-normal leading-[100%]">
          <div className="flex justify-between items-center gap-[10px]">
            <div className="text-[#BBACA6]">
              You bid / Refund
            </div>
            <div className="flex items-center justify-end gap-[7px]">
              <ButtonV2
                type="default"
                className="!h-[24px] !rounded-[12px] !px-[10px] !text-[#BBACA6]"
              >
                Claim
              </ButtonV2>
              <div className="">$200</div>
            </div>
          </div>
        </div>
      }
    />
  );
};
