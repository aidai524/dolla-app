import axiosInstance from "@/libs/axios";
import Big from "big.js";
import { QUOTE_TOKEN } from "@/config/btc";

export const getPoolInfo = async (poolId: number) => {
  const res = await axiosInstance.get(`/api/v1/pool?pool_id=${poolId}`);
  return res.data.data;
};

export const getAnchorPrice = (pool: any) => {
  if (pool?.anchor_price)
    return Big(pool.anchor_price * 1.2)
      .div(10 ** QUOTE_TOKEN.decimals)
      .toNumber();
  return 0;
};
