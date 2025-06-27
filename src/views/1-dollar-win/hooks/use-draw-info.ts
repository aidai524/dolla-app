import axiosInstance from "@/libs/axios";
import { useEffect, useState } from "react";
import currency from "@/config/currency";
import useSubDraw from "./use-sub-draw";
import { useHome } from "@/contexts/home";

export default function useDrawInfo(drawId?: string) {
  const [drawInfo, setDrawInfo] = useState<any>(null);
  const [drawInfoLoading, setDrawInfoLoading] = useState(true);
  const [players, setPlayers] = useState<any[]>([]);
  const { draw: subDraw } = useSubDraw(drawId);
  const { draws } = useHome();
  const [playersLoading, setPlayersLoading] = useState(false);

  const fetchDrawInfo = async (scient = false) => {
    const draw = draws.find((draw: any) => draw.id === Number(drawId)) || {};

    if (!scient) {
      setDrawInfoLoading(true);
    }

    try {
      setPlayersLoading(true);
      const response = await axiosInstance.get(`/api/draws/${drawId}`);
      setDrawInfo({
        ...draw,
        ...response.data.data,
        currencyIcon: currency[response.data.data.asset.currency].icon
      });
      setPlayers(response.data.data.buyers);
      setDrawInfoLoading(false);
      setPlayersLoading(false);
    } catch (error) {
      setDrawInfoLoading(false);
      setPlayersLoading(false);
      setPlayers([]);
      setDrawInfo(null);
    }
  };

  useEffect(() => {
    if (drawId) {
      fetchDrawInfo();
    } else {
      setDrawInfoLoading(false);
    }
  }, [drawId]);

  useEffect(() => {
    if (subDraw) {
      setPlayers(subDraw.buyers);
    }
  }, [subDraw]);

  return { drawInfo, drawInfoLoading, players, playersLoading, fetchDrawInfo };
}
