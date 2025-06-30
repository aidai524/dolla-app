import { useEffect, useRef, useState } from "react";
import axiosInstance from "@/libs/axios";
import { HOST_API } from "@/config";
import { useAuth } from "@/contexts/auth";

const LIMIT = 10;
export default function usePoolList() {
  const [poolList, setPoolList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState("value");
  const [sortOrder, setSortOrder] = useState("desc");
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(0);
  const { userInfo } = useAuth();

  const onQueryPoolList = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `${HOST_API}/api/v1/pool/list?limit=${LIMIT}&offset=${
          pageRef.current * LIMIT
        }&sort_field=${sortField}&sort_order=${sortOrder}&status=1&token_status=0`
      );

      setPoolList((prev) =>
        pageRef.current === 0
          ? res.data.data.list
          : [...prev, ...res.data.data.list]
      );
      setHasMore(res.data.data.list.length === LIMIT);
      if (res.data.data.list.length === LIMIT) {
        pageRef.current++;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo?.user) {
      pageRef.current = 0;
      setPoolList([]);
      onQueryPoolList();
    }
  }, [userInfo, sortOrder, sortField]);

  return {
    poolList,
    loading,
    onQueryPoolList,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    hasMore
  };
}
