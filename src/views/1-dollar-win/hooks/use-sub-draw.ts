import pusher from "@/libs/pusher";
import { useEffect, useState } from "react";

export default function useSubDraw(drawId?: string) {
  const [draw, setDraw] = useState<any>();

  useEffect(() => {
    if (!drawId) return;

    const channel = pusher.subscribe(`draw.${drawId}`);

    channel.bind("draw.updated", (data: any) => {
      console.log("draw.updated", data);
      setDraw(data.draw);
    });
  }, [drawId]);

  return { draw };
}
