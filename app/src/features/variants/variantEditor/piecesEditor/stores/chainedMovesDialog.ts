import { create } from "zustand";

type ChainedMovesDialogStore = {
	isChainedMovesDialogOpen: boolean;
	openChainedMovesDialog: () => void;
	closeChainedMovesDialog: () => void;
};

const useChainedMovesDialogStore = create<ChainedMovesDialogStore>((set) => ({
	isChainedMovesDialogOpen: false,
	openChainedMovesDialog: () => set({ isChainedMovesDialogOpen: true }),
	closeChainedMovesDialog: () => set({ isChainedMovesDialogOpen: false }),
}));

export default useChainedMovesDialogStore;