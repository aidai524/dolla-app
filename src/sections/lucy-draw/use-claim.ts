import axiosInstance from "@/libs/axios";
import { useState } from "react";
import useToast from "@/hooks/use-toast";

export default function useClaim({
  onClaimSuccess
}: {
  onClaimSuccess?: () => void;
}) {
  const [isClaiming, setIsClaiming] = useState(false);
  const toast = useToast();
  const claim = async (ids: number[]) => {
    try {
      setIsClaiming(true);
      const res = await axiosInstance.post(`/api/v1/ticket/claim`, {
        id: ids.join(",")
      });

      if (res.data.code === 0) {
        onClaimSuccess?.();
        toast.success({ title: "Claim successfully" });
      } else {
        toast.fail({ title: "Claim failed" });
      }
      setIsClaiming(false);
    } catch (error) {
      toast.fail({ title: "Claim failed" });
      setIsClaiming(false);
    }
  };
  return {
    claim,
    isClaiming
  };
}
