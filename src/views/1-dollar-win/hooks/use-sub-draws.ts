import axiosInstance from "@/libs/axios";
import { useEffect } from "react";
import { useDrawsUpdater } from "@/stores/use-draws-updater";

export default function useSubDraws(draws: any[]) {
  const drawsUpdater = useDrawsUpdater();

  useEffect(() => {
    const loop = async () => {
      clearTimeout(window.drawsUpdateTimer);
      try {
        const ids = draws.map((draw: any) => draw.id);
        if (ids.length === 0) return;
        const res = await axiosInstance.get("/api/draws/sales/data", {
          params: {
            draw_ids: ids.join(","),
            last_timestamp: drawsUpdater.timestamp
          }
        });

        const newUpdatedDraws = res.data.data.sales_data.reduce(
          (acc: any, curr: any) => {
            acc[curr.draw_id] = curr;
            return acc;
          },
          {}
        );

        drawsUpdater.set({
          updatedDraws: { ...drawsUpdater.updatedDraws, ...newUpdatedDraws },
          timestamp: res.data.data.timestamp
        });

        window.drawsUpdateTimer = setTimeout(loop, 5000);
      } catch (err) {}
    };
    if (draws?.length) loop();

    return () => {
      clearTimeout(window.drawsUpdateTimer);
    };
  }, [draws]);

  return { updatedDraws: drawsUpdater.updatedDraws };
}
