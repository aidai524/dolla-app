import SwitchPanel from "@/components/switch/switch-panel";
import Statistics from "../player/statistics";
import UserInfo from "../player/user-info";
import Invite from "../player/invite";
import OrderList from "./order-list";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import LoadingMore from "@/components/loading/loading-more";
import useCreatePoolList from "./hooks/use-create-pool-list";
import { INVATE_ACTIVE } from "@/config";
import Header from "../header";

export default function Seller() {
  const {
    data,
    loading,
    getCreatePoolList,
    updatePoolsData,
    hasMore,
    poolsData
  } = useCreatePoolList();

  const { containerRef, isLoading } = useInfiniteScroll(getCreatePoolList, {
    loading,
    hasMore,
    threshold: 100
  });
  return (
    <div className="pt-[30px] w-[640px] mx-auto pb-[30px]">
      <div
        ref={containerRef}
        className="w-[calc(100%+20px)] h-[calc(100vh-120px)] pr-[10px] overflow-y-auto"
      >
        <SwitchPanel>
          <Header tab="seller" />
          <div className="flex items-center justify-between pt-[30px] w-full">
            <UserInfo />
            {INVATE_ACTIVE && <Invite />}
          </div>
          <Statistics from="seller" />
          <OrderList
            orders={data}
            poolsData={poolsData}
            loading={isLoading}
            updatePoolsData={updatePoolsData}
          />
          {data.length > 0 && (
            <LoadingMore
              loading={isLoading}
              hasMore={hasMore}
              className="w-full"
            />
          )}
        </SwitchPanel>
      </div>
    </div>
  );
}
