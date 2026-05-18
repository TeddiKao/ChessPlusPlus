import type { GameState2DArray } from "@/features/variants/common/types/setupRules";
import { create } from "zustand";

type GameplayStore = {
	gameBoardState: GameState2DArray | null;
	updateGameBoardState: (gameBoardState: GameState2DArray) => void;
	resetGameBoardState: () => void;

	activeGameId: string | null;
	updateActiveGameId: (activeGameId: string) => void;
	clearActiveGameId: () => void;

	isBoardFlipped: boolean;
	toggleBoardFlip: () => void;
	resetBoardFlip: () => void;
};

const useGameplayStore = create<GameplayStore>((set) => ({
	gameBoardState: null,
	updateGameBoardState: (gameBoardState: GameState2DArray) =>
		set({ gameBoardState }),
	resetGameBoardState: () => set({ gameBoardState: null }),

	activeGameId: null,
	updateActiveGameId: (activeGameId: string) =>
		set({ activeGameId }),
	clearActiveGameId: () => set({ activeGameId: null }),

	isBoardFlipped: false,
	toggleBoardFlip: () =>
		set((state) => ({ isBoardFlipped: !state.isBoardFlipped })),
	resetBoardFlip: () => set({ isBoardFlipped: false }),
}));

export default useGameplayStore;
