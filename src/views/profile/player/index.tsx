import SwitchPanel from "@/components/switch/switch-panel";
import Statistics from "./statistics";
// import ProfileChart from "./profile-chart";
import History from "./history";
import UserInfo from "./user-info";
import Invite from "./invite";
import { INVATE_ACTIVE } from "@/config";
import Header from "../header";
import Dashboard from "../ components/dashboard/index";
import Tabs from "@/components/tabs";
import { useRef, useState, useEffect, useCallback } from "react";
import Radio from "@/components/radio";
import PlayerMarkets from "./markets";
import { AnimatePresence } from "framer-motion";
import Records from "./records";
import usePlayerHistory from "./hooks/use-player-history";
import LoadingMore from "@/components/loading/loading-more";

const TabsList = [
  {
    key: "joinedMarket",
    label: "Joined Market"
  },
  {
    key: "records",
    label: "Records"
  },
];

export default function Player() {
  const [tab, setTab] = useState(TabsList[0].key);
  const [joinedMarketFilter, setJoinedMarketFilter] = useState("1");

  const {
    page,
    loading,
    data,
    hasMore,
    onPageChange,

    joinedPoolListHasNextPage,
    joinedPoolListPageIndex,
    joinedPoolListLoading,
    joinedPoolListData,
    joinedPoolsData,
    onJoinedPoolListPageChange,
  } = usePlayerHistory();

  const containerRef = useRef<any>(null);
  const marketsBottomRef = useRef<any>(null);

  const handleLoadMore = useCallback(() => {
    if (joinedPoolListData.length > 0 && joinedPoolListHasNextPage && !joinedPoolListLoading) {
      onJoinedPoolListPageChange(joinedPoolListPageIndex + 1);
    }
  }, [joinedPoolListData.length, joinedPoolListHasNextPage, joinedPoolListLoading, joinedPoolListPageIndex, onJoinedPoolListPageChange]);

  useEffect(() => {
    if (!marketsBottomRef.current || joinedPoolListData.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && joinedPoolListHasNextPage && !joinedPoolListLoading) {
            handleLoadMore();
          }
        });
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1
      }
    );

    observer.observe(marketsBottomRef.current);

    return () => {
      if (marketsBottomRef.current) {
        observer.unobserve(marketsBottomRef.current);
      }
    };
  }, [joinedPoolListData.length, joinedPoolListHasNextPage, joinedPoolListLoading, handleLoadMore]);

  return (
    <div className="w-full h-screen overflow-y-auto pb-[30px]" ref={containerRef}>
      <div className="pt-[30px] w-[933px] mx-auto">
        <Header tab="player" />
        <SwitchPanel>
          <Dashboard tab="player" className="mt-[49px]" />
          <div className="flex justify-between items-center gap-[10px] mt-[44px]">
            <Tabs
              currentTab={tab}
              onChangeTab={setTab}
              tabs={TabsList}
              className="!gap-[62px]"
              tabClassName="!text-[18px] !pb-[14px] font-[SpaceGrotesk]"
              cursorClassName="!w-[30px] !bg-[#FFC42F] left-1/2 -translate-x-1/2"
            />
            {
              tab === TabsList[0].key && (
                <div className="flex items-center justify-end gap-[15px]">
                  <Radio
                    checked={joinedMarketFilter === "1"}
                    onChange={setJoinedMarketFilter}
                    name="joinedMarketFilter"
                    value="1"
                  />
                  <Radio
                    checked={joinedMarketFilter === "2"}
                    onChange={setJoinedMarketFilter}
                    name="joinedMarketFilter"
                    value="2"
                  >
                    Live only
                  </Radio>
                </div>
              )
            }
          </div>
          <AnimatePresence>
            {
              tab === TabsList[0].key && (
                <SwitchPanel>
                  <PlayerMarkets
                    poolsData={joinedPoolsData}
                    orders={joinedPoolListData}
                    loading={joinedPoolListLoading}
                    pageIndex={joinedPoolListPageIndex}
                    hasNextPage={joinedPoolListHasNextPage}
                    onPageChange={onJoinedPoolListPageChange}
                  />
                  <div ref={marketsBottomRef} className="h-[20px] flex justify-center items-center">
                    {joinedPoolListLoading && joinedPoolListData.length > 0 && (
                      <LoadingMore />
                    )}
                  </div>
                </SwitchPanel>
              )
            }
            {
              tab === TabsList[1].key && (
                <SwitchPanel>
                  <Records
                    page={page}
                    loading={loading}
                    data={data}
                    hasMore={hasMore}
                    onPageChange={onPageChange}
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
