import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface DrawsState {
  draws: any[];
  cursor: number;
  set: (params: any) => void;
}

export const useDrawsStore = create(
  persist<DrawsState>(
    (set) => ({
      draws: [],
      cursor: 0,
      set: (params) => set(() => ({ ...params }))
    }),
    {
      name: "_draws",
      version: 0.1,
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
