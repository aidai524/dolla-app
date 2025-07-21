import axiosInstance from "@/libs/axios";
import { useState } from "react";

export default function useClaim({
  onClaimSuccess
}: {
  onClaimSuccess?: () => void;
}) {
  const [isClaiming, setIsClaiming] = useState(false);
  const claim = async (id: number) => {
    setIsClaiming(true);
    const res = await axiosInstance.post(`/api/v1/ticket/claim`, { id });
    if (res.data.code === 0) {
      onClaimSuccess?.();
    }
    setIsClaiming(false);
  };
  return {
    claim,
    isClaiming
  };
}
