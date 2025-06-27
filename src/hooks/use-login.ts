import { useCallback, useState } from "react";
import axios from "@/libs/axios";

export default function useLogin() {
  const [loging, setLoging] = useState(false);

  const onLogin = useCallback(
    async ({
      address,
      signature,
      time,
      onSuccess
    }: {
      address: string;
      signature: string;
      time: number;
      onSuccess: () => void;
    }) => {
      try {
        setLoging(true);
        const res = await axios.get(
          `/api/v1/account/token?address=${address}&signature=${signature}&time=${time}`
        );

        localStorage.setItem(
          "_AK_TOKEN_",
          JSON.stringify({
            token: res.data.data,
            address
          })
        );
        onSuccess?.();
      } catch (err) {
      } finally {
        setLoging(false);
      }
    },
    []
  );

  const onLogout = useCallback(async (onSuccess?: () => void) => {
    await axios.post("/api/logout");
    onSuccess?.();
  }, []);

  return {
    loging,
    onLogin,
    onLogout
  };
}
