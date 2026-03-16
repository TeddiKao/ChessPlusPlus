import type { SquareInfo } from "@/features/variants/common/types/setupRules";
import { create } from "zustand";

type BoardSettingsStore = {
	boardSetup: SquareInfo[];
	addPieceToBoardSetup: (x: number, y: number, pieceName: string) => void;
	updateBoardSetup: (newBoardSetup: SquareInfo[]) => void;
	removePieceFromBoardSetup: (x: number, y: number) => void;

	boardXSize: number;
	updateBoardXSize: (newBoardXSize: number) => void;

	boardYSize: number;
	updateBoardYSize: (newBoardYSize: number) => void;
};

const useBoardSettingsStore = create<BoardSettingsStore>((set) => ({
	boardSetup: [],
	addPieceToBoardSetup: (x, y, pieceName: string) =>
		set((state) => ({
			boardSetup: [...state.boardSetup, { xPos: x, yPos: y, pieceName }],
		})),

	updateBoardSetup: (newBoardSetup) => set({ boardSetup: newBoardSetup }),

	removePieceFromBoardSetup: (x, y) =>
		set((state) => {
			return {
				boardSetup: state.boardSetup.filter(
					({ xPos, yPos }) => !(xPos === x && yPos === y),
				),
			};
		}),

	boardXSize: 8,
	updateBoardXSize: (newBoardXSize) => set({ boardXSize: newBoardXSize }),

	boardYSize: 8,
	updateBoardYSize: (newBoardYSize) => set({ boardYSize: newBoardYSize }),
}));

export default useBoardSettingsStore;
