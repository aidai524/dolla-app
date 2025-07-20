import axiosInstance from "@/libs/axios";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { useRequest } from "ahooks";

const LIMIT = 20;

export default function useUserRecords(props?: { isSinglePage?: boolean; }) {
  const { isSinglePage } = props ?? {};

  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(0);
  const { userInfo } = useAuth();

  const onQueryRecords = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/api/v1/user/records?limit=${LIMIT}&offset=${pageRef.current * LIMIT}`
      );

      setRecords((prev) =>
        pageRef.current === 0
          ? res.data.data.list
          : [...prev, ...res.data.data.list]
      );
      setHasMore(res.data.data.list.length === LIMIT);
      if (res.data.data.list.length === LIMIT) {
        pageRef.current++;
      }
    } catch (err) {
      console.error("Failed to fetch user records:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetRecords = () => {
    pageRef.current = 0;
    setRecords([]);
    setHasMore(true);
  };

  const [hasNextPage, setHasNextPage] = useState(true);
  const [userRecordsPageIndex, setUserRecordsPageIndex] = useState(1);
  const { data: userRecords, loading: userRecordsLoading } = useRequest(async () => {
    if (!userInfo?.user || !isSinglePage) {
      setUserRecordsPageIndex(1);
      return [];
    }
    try {
      const res = await axiosInstance.get(
        `/api/v1/user/records?limit=${20}&offset=${(userRecordsPageIndex - 1) * 20}`
      );

      setHasNextPage(res.data.data.has_next_page);
      return res.data.data.list || [];
    } catch (err) {
      console.error("Failed to fetch user records:", err);
    }
    return [];
  }, {
    refreshDeps: [userRecordsPageIndex, userInfo]
  });
  const onUserRecordsPageChange = (_page: number) => {
    setUserRecordsPageIndex(_page);
  };

  useEffect(() => {
    if (userInfo?.user && !isSinglePage) {
      pageRef.current = 0;
      onQueryRecords();
    }
  }, [userInfo]);

  return {
    loading,
    records,
    hasMore,
    onQueryRecords,
    resetRecords,

    userRecords,
    userRecordsLoading,
    userRecordsPageIndex,
    hasNextPage,
    onUserRecordsPageChange,
  };
}
