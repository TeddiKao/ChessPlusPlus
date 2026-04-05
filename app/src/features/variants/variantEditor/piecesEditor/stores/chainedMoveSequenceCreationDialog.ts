import { create } from "zustand";

type ChainedMoveSequenceCreationDialogStore = {
	isChainedMoveSequenceCreationDialogOpen: boolean;
	openChainedMoveSequenceCreationDialog: () => void;
	closeChainedMoveSequenceCreationDialog: () => void;

	searchQuery: string;
	updateSearchQuery: (query: string) => void;
	clearSearchQuery: () => void;
};

const useChainedMoveSequenceCreationDialogStore = create<ChainedMoveSequenceCreationDialogStore>((set) => ({
	isChainedMoveSequenceCreationDialogOpen: false,
	openChainedMoveSequenceCreationDialog: () => set({ isChainedMoveSequenceCreationDialogOpen: true }),
	closeChainedMoveSequenceCreationDialog: () => set({ isChainedMoveSequenceCreationDialogOpen: false }),

	searchQuery: "",
	updateSearchQuery: (query) => set({ searchQuery: query }),
	clearSearchQuery: () => set({ searchQuery: "" }),
}));

export default useChainedMoveSequenceCreationDialogStore;