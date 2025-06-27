import pusher from "@/libs/pusher";
import { useEffect, useState } from "react";

export default function useSubGame(gameId?: string) {
  const [game, setGame] = useState<any>();

  useEffect(() => {
    if (!gameId) return;

    const channel = pusher.subscribe(`game.${gameId}`);

    channel.bind("game.updated", (data: any) => {
      setGame(data.game);
    });
  }, [gameId]);

  return { game };
}
