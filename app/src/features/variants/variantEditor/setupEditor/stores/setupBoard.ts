import { create } from "zustand";

type SetupBoardStore = {
	isFlipped: boolean;
	toggleBoardFlip: () => void;
	resetBoardFlip: () => void;
}

const useSetupBoardStore = create<SetupBoardStore>((set) => ({
	isFlipped: false,
	toggleBoardFlip: () => set((state) => ({ isFlipped: !state.isFlipped })),
	resetBoardFlip: () => set({ isFlipped: false }),
}))

export default useSetupBoardStore;