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
	})),
);
export default usePieceRulesDraftStore;
