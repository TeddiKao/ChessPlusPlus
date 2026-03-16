import type { PiecesRules } from "@/features/variants/common/types/pieceRules";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type PieceRulesDraftStore = {
	pieces: PiecesRules | null;
	updatePieceRules: (newRules: PiecesRules) => void;
	clearPieceRules: () => void;

	addPiece: (
		pieceName: string,
		moveName: string,
		chainedMoves: string[],
	) => void;
	removePiece: (pieceName: string) => void;

	addMovementToPiece: (pieceName: string, moveName: string) => void;
	removeMovementFromPiece: (pieceName: string, moveName: string) => void;

	addChainedMoveToPiece: (
		pieceName: string,
		moveName: string,
		chainedMoveToAdd: string,
	) => void;
	removeChainedMoveFromPiece: (
		pieceName: string,
		moveName: string,
		chainedMoveToRemove: string,
	) => void;
};

const usePieceRulesDraftStore = create<PieceRulesDraftStore>()(
	immer((set) => ({
		pieces: null,
		updatePieceRules: (newPieceRules) => set({ pieces: newPieceRules }),
		clearPieceRules: () => set({ pieces: null }),

		addPiece: (pieceName, moveName, chainedMoves) => {
			set((state) => {
				if (!state.pieces) return;
				state.pieces[pieceName] = {
					moves: [{ moveName, chainedMoves }],
				};
			});
		},

		removePiece: (pieceName) => {
			set((state) => {
				if (!state.pieces) return;
				delete state.pieces[pieceName];
			});
		},

		addMovementToPiece: (pieceName, moveName) => {
			set((state) => {
				if (!state.pieces) return;
				if (!state.pieces[pieceName]) return;

				state.pieces[pieceName].moves.push({
					moveName,
					chainedMoves: [],
				});
			});
		},

		removeMovementFromPiece: (pieceName, moveName) => {
			set((state) => {
				if (!state.pieces) return;
				if (!state.pieces[pieceName]) return;

				state.pieces[pieceName].moves = state.pieces[
					pieceName
				].moves.filter((move) => move.moveName !== moveName);
			});
		},

		addChainedMoveToPiece: (pieceName, moveName, chainedMoveToAdd) => {
			set((state) => {
				if (!state.pieces) return;
				if (!state.pieces[pieceName]) return;

				const move = state.pieces[pieceName].moves.find(
					(moveRuleInfo) => moveRuleInfo.moveName === moveName,
				);
				if (!move) return;

				move.chainedMoves.push(chainedMoveToAdd);
			});
		},

		removeChainedMoveFromPiece: (
			pieceName,
			moveName,
			chainedMoveToRemove,
		) => {
			set((state) => {
				if (!state.pieces) return;
				if (!state.pieces[pieceName]) return;

				const move = state.pieces[pieceName].moves.find(
					(m) => m.moveName === moveName,
				);
				if (!move) return;

				move.chainedMoves = move.chainedMoves.filter(
					(chainedMove) => chainedMoveToRemove !== chainedMove,
				);
			});
		},
	})),
);
export default usePieceRulesDraftStore;
