import { create } from "zustand";

export type IndianState = "typing" | "thinking" | "tired" | "sleeping";

interface EngineerStatusStore {
  fatigue: number;
  indianState: IndianState;

  setFatigue: (fatigue: number) => void;
  setIndianState: (state: IndianState) => void;
  updateFatigue: (increment: number) => void;
  reset: () => void;
}

export const useEngineerStatusStore = create<EngineerStatusStore>((set) => ({
  fatigue: 0,
  indianState: "typing",

  setFatigue: (fatigue) => set({ fatigue: Math.min(fatigue, 100) }),

  setIndianState: (indianState) => set({ indianState }),

  updateFatigue: (increment) =>
    set((state) => ({
      fatigue: Math.min(state.fatigue + increment, 100),
    })),

  reset: () => set({ fatigue: 0, indianState: "typing" }),
}));
