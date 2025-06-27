import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo
} from "react";
import { useDebounceFn } from "ahooks";
import useUserInfo from "@/hooks/use-user-info";
import type { ReactNode } from "react";
import useLogin from "@/hooks/use-login";
import {
  useSignMessage,
  usePrivy,
  useWallets,
  useUser
} from "@privy-io/react-auth";
import { USE_OTHER_WALLET } from "@/config";
import { ethers } from "ethers";

const AuthContext = React.createContext<any | null>(null);

export const AuthProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { logout: privyLogout, login: privyLogin, ready } = usePrivy();
  const { user } = useUser();

  const { wallets } = useWallets();
  // const { wallets: solanaWallets } = useSolanaWallets();

  const privyWallet = useMemo(() => {
    if (wallets.length === 0) return { address: "" };
    if (wallets.length === 1) return wallets[0];
    const privyItem = wallets.find(
      (item) =>
        item.walletClientType === (USE_OTHER_WALLET ? "metamask" : "privy")
    );
    return privyItem;
  }, [wallets]);

  const {
    info: userInfo,
    onQueryUserInfo,
    setInfo
  } = useUserInfo(privyWallet?.address);
  const { signMessage } = useSignMessage();
  const { onLogin } = useLogin();
  const timer = useRef<any>(0);
  const [logining, setLogining] = useState(false);
  const [accountRefresher, setAccountRefresher] = useState(-1);

  const { run: updateAccount } = useDebounceFn(
    async () => {
      if (!privyWallet?.address) {
        return;
      }

      const loginedAddress = JSON.parse(
        localStorage.getItem("_AK_TOKEN_") || "{}"
      ).address;

      if (privyWallet?.address === loginedAddress) {
        await onQueryUserInfo();
        setAccountRefresher(1);
        return;
      }
      setLogining(true);
      sign();
    },
    { wait: 800 }
  );

  const sign = async () => {
    if (!privyWallet?.address) {
      login();
      return;
    }

    if (!user) {
      login();
      return;
    }

    try {
      const time = Date.now();
      const message = `login dolla,time:${time}`;
      let signature: string;

      // Choose different signing methods based on wallet type
      if (
        privyWallet &&
        "walletClientType" in privyWallet &&
        privyWallet.walletClientType === "metamask"
      ) {
        // Use MetaMask for signing
        const ethereumProvider = await privyWallet.getEthereumProvider();
        if (!ethereumProvider) {
          throw new Error("Failed to get Ethereum provider");
        }
        const provider = new ethers.providers.Web3Provider(ethereumProvider);
        const signer = provider.getSigner();
        signature = await signer.signMessage(message);
      } else {
        // Use Privy embedded wallet for signing
        const { signature: privySignature } = await signMessage({
          message
        });
        signature = privySignature;
      }

      onLogin({
        address: privyWallet?.address,
        signature,
        time,
        onSuccess: async () => {
          await onQueryUserInfo();
          setAccountRefresher(1);
          setLogining(false);
        }
      });
    } catch (error: any) {
      console.error("Sign message error:", error);
      setLogining(false);
      // If signing fails, it might be an authentication issue, redirect to login
      if (
        error?.message?.includes("authenticated") ||
        error?.message?.includes("embedded wallet")
      ) {
        login();
      }
    }
  };

  const login = useCallback(async () => {
    privyLogin?.();
  }, [privyLogin]);

  const logout = useCallback(async () => {
    await privyLogout?.();
    localStorage.removeItem("_AK_TOKEN_");
    setInfo(null);
    setAccountRefresher(0);
  }, [privyWallet?.address, privyLogout]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (!privyWallet?.address) {
      login();
      return;
    }

    if (user) {
      updateAccount();
    }

    clearTimeout(timer.current);

    return () => {
      clearTimeout(timer.current);
    };
  }, [privyWallet?.address, ready, user]);

  useEffect(() => {
    (window as any).sign = sign;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        address: privyWallet?.address,
        wallet: privyWallet,
        userInfo,
        accountRefresher,
        logining,
        login,
        logout,
        onQueryUserInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("");
  }

  return context;
}
