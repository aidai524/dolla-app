import axiosInstance from "@/libs/axios";
import { useConfigStore } from "@/stores/use-config";
import { useEffect } from "react";

export default function useConfig() {
  const configStore = useConfigStore();
  useEffect(() => {
    if (configStore.config) return;
    axiosInstance.get("/api/v1/config").then((res) => {
      configStore.set({ config: res.data.data });
    });
  }, []);
}
