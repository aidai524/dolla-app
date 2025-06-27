import axiosInstance from "@/libs/axios";
import { useState, useEffect, useRef } from "react";
import useSubGame from "@/hooks/use-sub-game";
import useGameInfo from "@/hooks/use-game-info";


export default function useCurrentGame({
  setOpen,
  setPreopen
}: {
  setOpen: (open: boolean) => void;
  setPreopen: (preopen: boolean) => void;
}) {
  const [currentGameId, setCurrentGameId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { gameInfo } = useGameInfo(currentGameId);
  const [currentGame, setCurrentGame] = useState<any>(null);
  const timer = useRef<NodeJS.Timeout>(null);
  const fetchCurrentGame = async () => {
    setLoading(true);
    const res = await axiosInstance.get("/api/games/websocket/info");
    setLoading(false);
    if (res.data.data.active_game_id) {
      setCurrentGameId(res.data.data.active_game_id);
    } else {
      setCurrentGameId("");
      setCurrentGame(null);
    }
  };

  const { game: subGame } = useSubGame(currentGameId);

  useEffect(() => {
    fetchCurrentGame();
  }, []);

  useEffect(() => {
    if (subGame?.id !== currentGameId) {
      setCurrentGame(gameInfo);
      return;
    }
    if (subGame?.status === "progressing") {
      setPreopen(true);
    } else if (subGame?.winner_info?.winner_id) {
      setPreopen(false);
      setOpen(true);
      timer.current = setTimeout(() => {
        fetchCurrentGame();
        setOpen(false);
      }, 5000);
    }

    setCurrentGame({
      ...gameInfo,
      ...subGame
    });

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [subGame, gameInfo]);

  return { loading, currentGame };
}
