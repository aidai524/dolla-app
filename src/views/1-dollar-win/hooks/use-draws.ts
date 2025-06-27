import { useEffect, useState, useRef } from "react";
import axiosInstance from "@/libs/axios";
import pusher from "@/libs/pusher";
import { useDrawsStore } from "@/stores/use-draws";

const PAGE_SIZE = 20;

export default function useDraws() {
  const [, setIsFirstPage] = useState(true);
  const [drawsLoading, setDrawsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [newHints, setNewHints] = useState(0);
  const preCursorRef = useRef(null);
  const drawsStore = useDrawsStore();

  const fetchDraws = async (refresh = false) => {
    if (!refresh && !hasMore) {
      setDrawsLoading(false);
      return;
    }
    try {
      const response = await axiosInstance.get("/api/draws/list/data", {
        params: {
          limit: PAGE_SIZE,
          cursor: refresh ? Math.floor(Date.now() / 1000) : drawsStore.cursor
        }
      });

      if (!response.data.success) throw Error("Not success");
      const { draws: newDraws, has_more, cursor } = response.data.data;

      let mergedDraws = refresh
        ? newDraws
        : [...drawsStore.draws.filter((draw) => !!draw), ...newDraws];

      drawsStore.set({
        draws: mergedDraws,
        cursor
      });
      setHasMore(has_more);
      setDrawsLoading(false);
    } catch (error) {
      console.log(46, error);
      setDrawsLoading(false);
    }
  };

  const setInitialDraws = async (data: any) => {
    const { draws: newDraws, has_more, cursor } = data;
    drawsStore.set({
      draws: newDraws,
      cursor
    });
    setHasMore(has_more);
  };

  useEffect(() => {
    const channel = pusher.subscribe("draws-waterfall");

    channel.bind("draws.updated", async (data: any) => {
      if (data.cursor === preCursorRef.current) return;
      console.log("draws.updated", data);
      preCursorRef.current = data.cursor;
      if (window.location.pathname === "/") {
        const res = await axiosInstance.get("/api/draws/waterfall/data", {
          params: {
            cursor: drawsStore.cursor || Math.floor(Date.now() / 1000),
            sort_by: "created_at",
            sort_order: "asc"
          }
        });
        if (res.data.data.new_draw_number) {
          // window.howl.hints.play();
          setNewHints(res.data.data.new_draw_number);
        }
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (newHints) {
      setTimeout(() => {
        setNewHints(0);
      }, 5000);
    }
  }, [newHints]);

  return {
    draws: drawsStore.draws,
    drawsLoading,
    newHints,
    hasMore,
    fetchDraws,
    setIsFirstPage,
    setInitialDraws,
    setDrawsLoading
  };
}
