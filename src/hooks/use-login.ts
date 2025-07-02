import { useCallback, useState } from "react";
import axios from "@/libs/axios";
import { useSessionSigners } from "@privy-io/react-auth";
import axiosInstance from "@/libs/axios";

export default function useLogin() {
  const [loging, setLoging] = useState(false);
  const { addSessionSigners } = useSessionSigners();

  const onLogin = useCallback(
    async ({
      address,
      signature,
      time,
      solAddress,
      userId,
      onSuccess
    }: {
      address: string;
      signature: string;
      time: number;
      solAddress: string;
      userId: string;
      onSuccess: () => void;
    }) => {
      try {
        setLoging(true);
        const res = await axios.get(
          `/api/v1/account/token?address=${address}&signature=${signature}&time=${time}&sol_address=${solAddress}&privy_wallet_id=${userId}`
        );

        localStorage.setItem(
          "_AK_TOKEN_",
          JSON.stringify({
            token: res.data.data,
            address
          })
        );
        onSuccess?.();
        const users = await axiosInstance.get("/api/v1/privy/user");
        const linkedAccounts = users?.data?.data?.linked_accounts;
        linkedAccounts?.forEach((account: any) => {
          if (account.wallet_client_type === "privy" && !account.delegated) {
            addSessionSigners({
              address: account.address,
              signers: [
                {
                  signerId: import.meta.env.VITE_PRIVY_SIGNER_ID
                }
              ]
            });
          }
        });
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
