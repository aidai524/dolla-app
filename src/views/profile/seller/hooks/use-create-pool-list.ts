import axiosInstance from "@/libs/axios";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { getPoolInfo } from "@/utils/pool";

const pageSize = 10;

export default function useCreatePoolList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(0);
  const { userInfo } = useAuth();
  const poolsData = useRef<any>({});
  const getCreatePoolList = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/v1/user/create/pool/list?limit=${pageSize}&offset=${
          pageRef.current * pageSize
        }`
      );
      const poolIds: number[] = [];
      response.data.data.list.forEach((item: any) => {
        poolsData.current[item.pool_id] = item;
        poolIds.push(item.pool_id);
      });

      setData((prev) =>
        pageRef.current === 0 ? poolIds : [...prev, ...poolIds]
      );
      if (response.data.data.list.length < pageSize) {
        setHasMore(false);
      } else {
        pageRef.current = pageRef.current + 1;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updatePoolsData = async (poolId: number, data?: any) => {
    if (data) {
      poolsData.current[poolId] = {
        ...poolsData.current[poolId],
        ...data
      };
    } else {
      const res = await getPoolInfo(poolId);
      poolsData.current[poolId] = res;
    }
  };

  useEffect(() => {
    if (userInfo?.user) {
      getCreatePoolList();
    }
  }, [userInfo]);

  return {
    data,
    loading,
    getCreatePoolList,
    updatePoolsData,
    poolsData: poolsData.current,
    hasMore
  };
}
