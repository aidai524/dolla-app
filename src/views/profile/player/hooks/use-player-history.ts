import axiosInstance from "@/libs/axios";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import Big from "big.js";

const pageSize = 8;

export default function usePlayerHistory() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const { userInfo } = useAuth();
  const getCreatePoolList = async (_page: number) => {
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo?.user) {
      getCreatePoolList(1);
    }
  }, [userInfo]);

  const onPageChange = (_page: number) => {
    setPage(_page);
    setData([]);
    getCreatePoolList(_page);
  };

  return {
    page,
    data,
    loading,
    onPageChange
  };
}
