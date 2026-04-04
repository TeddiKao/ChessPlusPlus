import { create } from "zustand";

type ChainedMovesDialogStore = {
	isChainedMovesDialogOpen: boolean;
	openChainedMovesDialog: () => void;
	closeChainedMovesDialog: () => void;

	activePiece: string | null;
	updateActivePiece: (piece: string) => void;
	clearActivePiece: () => void;
};

const useChainedMovesDialogStore = create<ChainedMovesDialogStore>((set) => ({
	isChainedMovesDialogOpen: false,
	openChainedMovesDialog: () => set({ isChainedMovesDialogOpen: true }),
	closeChainedMovesDialog: () => set({ isChainedMovesDialogOpen: false }),

	activePiece: null,
	updateActivePiece: (piece) => set({ activePiece: piece }),
	clearActivePiece: () => set({ activePiece: null }),
}));

export default useChainedMovesDialogStore;