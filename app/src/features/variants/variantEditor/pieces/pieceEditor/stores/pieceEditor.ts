import { create } from "zustand";

type PieceEditorStore = {
	currentPiece: string | null;
	updateCurrentPiece: (piece: string | null) => void;
	clearCurrentPiece: () => void;
};

const usePieceEditorStore = create<PieceEditorStore>((set) => ({
	currentPiece: null,
	updateCurrentPiece: (piece) => set({ currentPiece: piece }),
	clearCurrentPiece: () => set({ currentPiece: null }),
}));

export default usePieceEditorStore;
