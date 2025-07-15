import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RandomnessState {
  randomnessAccount: string;
  randomnessCreateIx: any;
  updateTime: number;
  set: (params: any) => void;
}

export const useRandomnessStore = create(
  persist<RandomnessState>(
    (set) => ({
      randomnessAccount: "",
      randomnessCreateIx: [],
      updateTime: 0,
      set: (params) => set(() => ({ ...params }))
    }),
    {
      name: "_randomness",
      version: 0.1,
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
