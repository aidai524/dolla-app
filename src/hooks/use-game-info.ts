import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/libs/axios";
import currency from "@/config/currency";

export default function useGameInfo(gameId?: string) {
  const [gameInfo, setGameInfo] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchGameInfo = useCallback(async () => {
  try {
    setLoading(true);
    const res = await axiosInstance.get(`/api/games/${gameId}`);
    setGameInfo({
      ...res.data.data,
      currencyIcon: currency[res.data.data.asset.currency].icon
    });
  } catch (err) {
    console.log(err);
    setGameInfo(null);
  } finally {
    setLoading(false);
  }
  }, [gameId]);

  useEffect(() => {
    if (!gameId) return;
    fetchGameInfo();
  }, [gameId]);
  return { gameInfo, loading };
}
