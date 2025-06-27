import { useEffect, useState } from "react";
import axiosInstance from "@/libs/axios";
import { useDebounceFn } from "ahooks";

export default function usePrices(id?: string) {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchPrice = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/v1/nft/prices/${id}`);
      setPrices(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const { run: fetchPriceDebounce } = useDebounceFn(
    () => {
      if (id) {
        fetchPrice();
      } else {
        setPrices({});
      }
    },
    {
      wait: 500
    }
  );

  useEffect(() => {
    fetchPriceDebounce();
  }, [id]);

  return { prices, loading };
}
