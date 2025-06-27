import axiosInstance from "@/libs/axios";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/auth";

const LIMIT = 20;

export default function useUserRecords() {
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

  useEffect(() => {
    if (userInfo?.user) {
      pageRef.current = 0;
      onQueryRecords();
    }
  }, [userInfo]);

  return {
    loading,
    records,
    hasMore,
    onQueryRecords,
    resetRecords
  };
}
