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
import Dashboard from "../ components/dashboard/index";
import { useState } from "react";
import Tabs from "@/components/tabs";
import { AnimatePresence } from "framer-motion";
import SellerMarkets from "./markets";
import Records from "./records";

const TabsList = [
  {
    key: "createdMarket",
    label: "Created Market"
  },
  {
    key: "records",
    label: "Records"
  },
];

export default function Seller() {
  const {
    data,
    loading,
    getCreatePoolList,
    updatePoolsData,
    hasMore,
    poolsData,
    records,
    recordsLoading,
    onRecordsPrevPage,
    onRecordsNextPage,
    recordsPageIndex,
    recordsPageHasNextPage,
  } = useCreatePoolList();

  // @ts-ignore
  const { containerRef, isLoading } = useInfiniteScroll(getCreatePoolList, {
    loading,
    hasMore,
    threshold: 100
  });

  const [tab, setTab] = useState(TabsList[0].key);

  return (
    <div className="w-full h-screen overflow-y-auto pb-[30px]" ref={containerRef}>
      <div className="pt-[30px] w-[933px] mx-auto">
        <Header tab="seller" />
        <SwitchPanel>
          <Dashboard tab="seller" className="mt-[49px]" />
          <div className="flex justify-between items-center gap-[10px] mt-[44px]">
            <Tabs
              currentTab={tab}
              onChangeTab={setTab}
              tabs={TabsList}
              className="!gap-[62px]"
              tabClassName="!text-[18px] !pb-[14px] font-[SpaceGrotesk]"
              cursorClassName="!w-[30px] !bg-[#FFC42F] left-1/2 -translate-x-1/2"
            />
          </div>
          <AnimatePresence>
            {
              tab === TabsList[0].key && (
                <SwitchPanel>
                  <SellerMarkets
                    poolsData={poolsData}
                    orders={data}
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
              )
            }
            {
              tab === TabsList[1].key && (
                <SwitchPanel>
                  <Records
                    records={records}
                    loading={recordsLoading}
                    onPrevPage={onRecordsPrevPage}
                    onNextPage={onRecordsNextPage}
                    currentPage={recordsPageIndex}
                    hasNextPage={recordsPageHasNextPage}
                  />
                </SwitchPanel>
              )
            }
          </AnimatePresence>
        </SwitchPanel>
      </div>
    </div>
  );
}
