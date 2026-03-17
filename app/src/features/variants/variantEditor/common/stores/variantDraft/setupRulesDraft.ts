import type { SetupRules } from "@/features/variants/common/types/setupRules";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type SetupRulesDraftStore = {
	setupRules: SetupRules | null;
	updateSetupRules: (newRules: SetupRules) => void;
	clearSetupRules: () => void;

	addToPieceOwnership: (
		pieceName: string,
		ownership: "white" | "black",
	) => void;
	removeFromPieceOwnership: (pieceName: string) => void;

	updateBoardXSize: (newBoardXSize: number) => void;
	updateBoardYSize: (newBoardYSize: number) => void;

	addPieceToStartingPosition: (
		x: number,
		y: number,
		pieceName: string,
	) => void;
	removePieceFromStartingPosition: (x: number, y: number) => void;
	movePieceInStartingPosition: (
		fromX: number,
		fromY: number,
		toX: number,
		toY: number,
	) => void;
	clearStartingPosition: () => void;
};

const useSetupRulesDraftStore = create<SetupRulesDraftStore>()(
	immer((set) => ({
		setupRules: null,
		updateSetupRules: (newSetupRules) => set({ setupRules: newSetupRules }),
		clearSetupRules: () => set({ setupRules: null }),

		addToPieceOwnership: (pieceName, ownership) => {
			set((state) => {
				if (!state.setupRules) return;
				state.setupRules.pieceOwnership[ownership].push(pieceName);
			});
		},

		removeFromPieceOwnership: (pieceName) => {
			set((state) => {
				if (!state.setupRules) return;
				state.setupRules.pieceOwnership.white =
					state.setupRules.pieceOwnership.white.filter(
						(p) => p !== pieceName,
					);
				state.setupRules.pieceOwnership.black =
					state.setupRules.pieceOwnership.black.filter(
						(p) => p !== pieceName,
					);
			});
		},

		updateBoardXSize: (newBoardXSize) => {
			set((state) => {
				if (!state.setupRules) return;
				state.setupRules.boardXSize = newBoardXSize;
			});
		},
		updateBoardYSize: (newBoardYSize) => {
			set((state) => {
				if (!state.setupRules) return;
				state.setupRules.boardYSize = newBoardYSize;
			});
		},

		addPieceToStartingPosition: (x, y, pieceName) => {
			set((state) => {
				if (!state.setupRules) return;

				const existingPieceIndex =
					state.setupRules.startingPosition.findIndex(
						(squareInfo) =>
							squareInfo.xPos === x && squareInfo.yPos === y,
					);
				if (existingPieceIndex !== -1) {
					state.setupRules.startingPosition[
						existingPieceIndex
					].pieceName = pieceName;
				} else {
					state.setupRules.startingPosition.push({
						xPos: x,
						yPos: y,
						pieceName,
					});
				}
			});
		},
		removePieceFromStartingPosition: (x, y) => {
			set((state) => {
				if (!state.setupRules) return;

				const pieceIndex = state.setupRules.startingPosition.findIndex(
					(squareInfo) =>
						squareInfo.xPos === x && squareInfo.yPos === y,
				);
				if (pieceIndex === -1) return;

				state.setupRules.startingPosition.splice(pieceIndex, 1);
			});
		},
		movePieceInStartingPosition: (fromX, fromY, toX, toY) => {
			set((state) => {
				if (!state.setupRules) return;

				const fromPieceIndex =
					state.setupRules.startingPosition.findIndex(
						(squareInfo) =>
							squareInfo.xPos === fromX &&
							squareInfo.yPos === fromY,
					);
				if (fromPieceIndex === -1) return;

				const pieceToMove =
					state.setupRules.startingPosition[fromPieceIndex];
				state.setupRules.startingPosition.splice(fromPieceIndex, 1);

				const toPieceIndex =
					state.setupRules.startingPosition.findIndex(
						(squareInfo) =>
							squareInfo.xPos === toX && squareInfo.yPos === toY,
					);
				if (toPieceIndex !== -1) {
					state.setupRules.startingPosition[toPieceIndex].pieceName =
						pieceToMove.pieceName;
				} else {
					state.setupRules.startingPosition.push({
						...pieceToMove,
						xPos: toX,
						yPos: toY,
					});
				}
			});
		},

		clearStartingPosition: () => {
			set((state) => {
				if (!state.setupRules) return;
				state.setupRules.startingPosition = [];
			});
		},
	})),
);

export default useSetupRulesDraftStore;
