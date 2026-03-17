import type {
	ChainedMovePath,
	MoveNode,
	PiecesRules,
} from "@/features/variants/common/types/pieceRules";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getChainedMoveNodeFromPath } from "@/features/variants/variantEditor/common/utils/moveNodePath";

type PieceRulesDraftStore = {
	pieces: PiecesRules | null;
	updatePieceRules: (newRules: PiecesRules) => void;
	clearPieceRules: () => void;

	addPiece: (
		pieceName: string,
		moveName: string,
		chainedMoves: MoveNode[],
	) => void;
	removePiece: (pieceName: string) => void;

	addMovementToPiece: (pieceName: string, moveName: string) => void;
	removeMovementFromPiece: (pieceName: string, moveName: string) => void;

	addChainedMoveToPiece: (
		pieceName: string,
		rootMoveName: string,
		movePath: ChainedMovePath,
		chainedMoveToAdd: MoveNode,
	) => void;
	removeChainedMoveFromPiece: (
		pieceName: string,
		rootMoveName: string,
		movePath: ChainedMovePath,
		chainedMoveNameToRemove: string,
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

		addChainedMoveToPiece: (
			pieceName,
			rootMoveName,
			movePath,
			chainedMoveToAdd,
		) => {
			set((state) => {
				if (!state.pieces) return;

				const currentNodeChainedMoves = getChainedMoveNodeFromPath(
					state.pieces,
					pieceName,
					rootMoveName,
					movePath,
				);
				if (!currentNodeChainedMoves) return;

				currentNodeChainedMoves.push(chainedMoveToAdd);
			});
		},

		removeChainedMoveFromPiece: (
			pieceName,
			rootMoveName,
			movePath,
			chainedMoveNameToRemove,
		) => {
			set((state) => {
				if (!state.pieces) return;
				if (!state.pieces[pieceName]) return;

				const currentNodeChainedMoves = getChainedMoveNodeFromPath(
					state.pieces,
					pieceName,
					rootMoveName,
					movePath,
				);
				if (!currentNodeChainedMoves) return;

				currentNodeChainedMoves.splice(
					currentNodeChainedMoves.findIndex(
						(chainedMove) =>
							chainedMove.moveName === chainedMoveNameToRemove,
					),
					1,
				);
			});
		},
	})),
);
export default usePieceRulesDraftStore;
