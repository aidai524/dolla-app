import { useAuth } from "@/contexts/auth";
import axiosInstance from "@/libs/axios";
import { useEffect, useState, useMemo } from "react";
import { TOKEN } from "@/config/btc";
import { PURCHASE_TOKEN } from "@/config";
import useTokenBalance from "./use-token-balance";

export default function useUserWinner() {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAuth();
  // const { tokenBalance } = useTokenBalance(TOKEN);
  const { tokenBalance: coinBalance } = useTokenBalance(PURCHASE_TOKEN);

  const fetchNfts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/v1/user/winning");
      const _nfts: any = [];

      // if (Number(tokenBalance) > 0) {
      //   _nfts.push({
      //     label: TOKEN.symbol,
      //     address: TOKEN.address,
      //     amount: tokenBalance,
      //     icon: TOKEN.icon,
      //     type: "coin"
      //   });
      // }

      res.data.data
        .filter(
          (item: any) =>
            item.token.toLocaleLowerCase() !==
              PURCHASE_TOKEN.address.toLocaleLowerCase() &&
            item.token.toLocaleLowerCase() !== TOKEN.address.toLocaleLowerCase()
        )
        .forEach((item: any) => {
          _nfts.push({
            label: "NFT Prize",
            address: item.token,
            icon: item.icon,
            type: "nft",
            tokenId: item.token_id
          });
        });

      setNfts(_nfts);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo?.user) {
      fetchNfts();
    }
  }, [userInfo]);

  const coinItem = useMemo(() => {
    if (Number(coinBalance) <= 0) return null;
    return {
      label: "Bid Coins",
      address: PURCHASE_TOKEN.address,
      amount: coinBalance,
      type: "coin"
    };
  }, [coinBalance]);

  return { coinItem, nfts, loading };
}
