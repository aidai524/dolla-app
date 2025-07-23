import axiosInstance from "@/libs/axios";
import { useState } from "react";
import useToast from "@/hooks/use-toast";
import useUserPrize from "@/hooks/use-user-prize";

export default function useRedeem({
  token,
  onSuccess
}: {
  token: any;
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { getUserPrize } = useUserPrize();

  const redeem = async (number: number) => {
    setLoading(true);
    let toastId = toast.loading({ title: "Redeeming..." });
    try {
      const response = await axiosInstance.post(
        `/api/v1/user/point/withdrawal`,
        {
          volume: token.token_volume,
          token: token.token,
          number
        }
      );
      if (response.data.code === 0) {
        setLoading(false);
        toast.dismiss(toastId);
        toast.success({ title: "Redeemed successfully" });
        onSuccess?.();
        getUserPrize();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.dismiss(toastId);
      toast.fail({ title: "Redeem failed" });
      console.log(error);
    }
  };
  return { loading, redeem };
}
