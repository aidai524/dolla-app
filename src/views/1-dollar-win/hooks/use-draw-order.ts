import axiosInstance from "@/libs/axios";
import { useCallback, useState } from "react";
import useToast from "@/hooks/use-toast";

export default function useDrawOrder(data: any) {
  const [drawOrderLoading, setDrawOrderLoading] = useState(false);
  const [probabilityLoading, setProbabilityLoading] = useState(false);
  const [probability, setProbability] = useState<number>(0);
  const [quantity, setQuantity] = useState<any>();
  const [bidResult, setBidResult] = useState<any>(null);
  const { fail, success } = useToast();

  const getProbability = (q: number) => {
    if (data.status !== "active" || !q) {
      return 0;
    }

    const listPrice = data.total_shares > 0 ? data.total_shares : 1;
    const winProbabilityPerDraw = 1 / listPrice;

    const cumulativeProbability = 1 - Math.pow(1 - winProbabilityPerDraw, q);

    return cumulativeProbability * 100;
  };

  const fetchDrawProbability = useCallback(() => {
    setProbabilityLoading(true);
    try {
      setProbability(getProbability(quantity));
    } catch (error) {
      setProbability(0);
    }
    setProbabilityLoading(false);
  }, [data.id, quantity]);

  const placeOrder = useCallback(async () => {
    // setDrawOrderLoading(true);
    // setTimeout(() => {
    //   setBidResult({
    //     is_winner: false
    //   });
    //   setDrawOrderLoading(false);
    // }, 1000);
    // return;
    setDrawOrderLoading(true);
    try {
      const response = await axiosInstance.post(
        `/api/draws/${data.id}/purchase`,
        {
          quantity
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      setBidResult(response.data.result);
      // success({
      //   title: response.data.result.message
      // });
    } catch (error) {
      fail({
        title: "Failed to purchase"
      });
    }
    setDrawOrderLoading(false);
  }, [data.id, quantity]);

  return {
    probability,
    probabilityLoading,
    fetchDrawProbability,
    drawOrderLoading,
    placeOrder,
    quantity,
    setQuantity,
    bidResult,
    setBidResult,
    getProbability
  };
}
