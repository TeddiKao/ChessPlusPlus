import { create } from "zustand";

type ChainedMoveSequenceCreationDialogStore = {
	isChainedMoveSequenceCreationDialogOpen: boolean;
	openChainedMoveSequenceCreationDialog: () => void;
	closeChainedMoveSequenceCreationDialog: () => void;
};

const useChainedMoveSequenceCreationDialogStore = create<ChainedMoveSequenceCreationDialogStore>((set) => ({
	isChainedMoveSequenceCreationDialogOpen: false,
	openChainedMoveSequenceCreationDialog: () => set({ isChainedMoveSequenceCreationDialogOpen: true }),
	closeChainedMoveSequenceCreationDialog: () => set({ isChainedMoveSequenceCreationDialogOpen: false }),
}));

export default useChainedMoveSequenceCreationDialogStore;