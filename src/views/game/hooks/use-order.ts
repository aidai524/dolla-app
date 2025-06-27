import axiosInstance from "@/libs/axios";
import { useCallback, useState } from "react";
import useToast from "@/hooks/use-toast";

export default function useOrder({ gameId }: { gameId: string }) {
  const [loading, setLoading] = useState(false);
  const { fail, success } = useToast();
  const [quantity, setQuantity] = useState<any>();

  const onOrder = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/api/games/${gameId}/orders`, {
        quantity,
        transaction_hash: "0x1234..."
      });
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      success({
        title: "Order created successfully"
      });
    } catch (error) {
      fail({
        title: "Order creation failed"
      });
    } finally {
      setLoading(false);
    }
  }, [gameId, quantity]);

  return {
    loading,
    quantity,
    setQuantity,
    onOrder
  };
}
