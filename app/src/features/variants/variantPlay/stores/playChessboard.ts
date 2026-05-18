import type { GameStateMap } from "@/features/variants/common/types/setupRules";
import { create } from "zustand";

type PlayChessboardStore = {
	gameBoardState: GameStateMap | null;
	updateGameBoardState: (gameBoardState: GameStateMap) => void;
	resetGameBoardState: () => void;

	isFlipped: boolean;
	toggleBoardFlip: () => void;
	resetBoardFlip: () => void;
}

const usePlayChessboardStore = create<PlayChessboardStore>((set) => ({
	gameBoardState: null,
	updateGameBoardState: (gameBoardState: GameStateMap) => set({ gameBoardState }),
	resetGameBoardState: () => set({ gameBoardState: null }),
	
	isFlipped: false,
	toggleBoardFlip: () => set((state) => ({ isFlipped: !state.isFlipped })),
	resetBoardFlip: () => set({ isFlipped: false }),
}));

export default usePlayChessboardStore;