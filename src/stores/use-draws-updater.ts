import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface DrawsUpdaterState {
  updatedDraws: Record<string, any>;
  timestamp: number;
  set: (params: any) => void;
}

export const useDrawsUpdater = create(
  persist<DrawsUpdaterState>(
    (set) => ({
      updatedDraws: {},
      timestamp: 0,
      set: (params) => set(() => ({ ...params }))
    }),
    {
      name: "_draws_updater",
      version: 0.1,
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
