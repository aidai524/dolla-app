import { useAuth } from "@/contexts/auth";
import axiosInstance from "@/libs/axios";
import { useEffect, useState } from "react";

export default function useTokenPrice(tokens: string[] | string) {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { userInfo } = useAuth();
  const fetchPrice = async () => {
    try {
      setLoading(true);
      const _tokens = Array.isArray(tokens) ? tokens : [tokens];
      const res = await axiosInstance.get(
        `/api/v1/token/price?tokens=${_tokens.join(",")}`
      );

      setPrices(res.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userInfo?.user) return;
    if ((Array.isArray(tokens) && tokens.length === 0) || !tokens) return;
    if (Array.isArray(tokens) && tokens.filter((item) => !!item).length === 0)
      return;
    fetchPrice();
  }, [userInfo, tokens]);

  return { prices, loading };
}
