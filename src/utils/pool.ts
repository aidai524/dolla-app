import axiosInstance from "@/libs/axios";

export const getPoolInfo = async (poolId: number) => {
  const res = await axiosInstance.get(`/api/v1/pool?pool_id=${poolId}`);
  return res.data.data;
};
