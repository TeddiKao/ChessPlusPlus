import { create } from "zustand";

type PlayChessboardStore = {
	isFlipped: boolean;
	toggleBoardFlip: () => void;
	resetBoardFlip: () => void;
}

const usePlayChessboardStore = create<PlayChessboardStore>((set) => ({
	isFlipped: false,
	toggleBoardFlip: () => set((state) => ({ isFlipped: !state.isFlipped })),
	resetBoardFlip: () => set({ isFlipped: false }),
}));

export default usePlayChessboardStore;