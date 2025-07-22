import axiosInstance from "@/libs/axios";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/auth";
import Big from "big.js";
import { useRequest } from "ahooks";

const pageSize = 10;

export default function usePlayerHistory() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const { userInfo } = useAuth();
  const [hasMore, setHasMore] = useState(true);

  const joinedPoolsData = useRef<any>({});
  const [joinedPoolListData, setJoinedPoolListData] = useState<any>([]);
  const [joinedPoolListPageIndex, setJoinedPoolListPageIndex] = useState(1);
  const [joinedPoolListPageSize] = useState(10);
  const [joinedPoolListHasNextPage, setJoinedPoolListHasNextPage] = useState(true);

  const { loading: joinedPoolListLoading } = useRequest(async () => {
    if (!userInfo?.user) return [];
    try {
      // const response = await axiosInstance.get(
      //   `/api/v1/user/player/history?limit=${joinedPoolListPageSize}&offset=${
      //     (joinedPoolListPageIndex - 1) * joinedPoolListPageSize
      //   }`
      // );
      const response = {
        data: { data: { list: [], has_next_page: false } }
      };
      const poolIds: number[] = [];
      setJoinedPoolListHasNextPage(response.data.data.has_next_page);
      response.data.data.list.forEach((item: any) => {
        joinedPoolsData.current[item.pool_id] = item;
        poolIds.push(item.pool_id);
      });

      setJoinedPoolListData((prev: any) =>
        joinedPoolListPageIndex === 1 ? poolIds : [...prev, ...poolIds]
      );
    } catch (error) {
      console.log(error);
    }
  }, {
    refreshDeps: [joinedPoolListPageIndex, joinedPoolListPageSize, userInfo]
  });

  const onJoinedPoolListPageChange = (_page: number) => {
    setJoinedPoolListPageIndex(_page);
  };

  const getRecords = async (_page: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/v1/user/player/history?limit=${pageSize}&offset=${
          (_page - 1) * pageSize
        }`
      );

      setData(
        response.data.data.list.map((item: any) => {
          return {
            ...item,
            purchase_amount: Big(item.purchase_amount || 0)
              .div(10 ** item.purchase_token_info.decimals)
              .toString(),
            rewardTokenInfo: item.reward_token_info?.[0] || {}
          };
        })
      );
      setHasMore(response.data.data.list.length === pageSize);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo?.user) {
      getRecords(1);
    }
  }, [userInfo]);

  const onPageChange = (_page: number) => {
    setPage(_page);
    setData([]);
    getRecords(_page);
  };

  return {
    page,
    data,
    loading,
    hasMore,
    onPageChange,

    joinedPoolListHasNextPage,
    joinedPoolListPageIndex,
    joinedPoolListLoading,
    joinedPoolListData,
    joinedPoolsData: joinedPoolsData.current,
    onJoinedPoolListPageChange,
  };
}
