import axiosInstance from "@/libs/axios";

export const getPoolInfo = async (poolId: number) => {
  const res = await axiosInstance.get(`/api/v1/pool?pool_id=${poolId}`);
  return res.data.data;
};

export const getAnchorPrice = (pool: any) => {
  if (
    pool?.reward_token_price?.[0]?.last_price &&
    pool?.reward_token_price?.[0]?.last_price !== "0"
  )
    return pool?.reward_token_price?.[0]?.last_price;
  return pool?.reward_token_price?.[0]?.floor_price;
};
