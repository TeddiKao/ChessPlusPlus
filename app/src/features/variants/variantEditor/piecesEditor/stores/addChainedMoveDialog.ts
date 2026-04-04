import { create } from "zustand";

type AddChainedMoveDialogStore = {
	isChainedMoveDialogOpen: boolean;
	openChainedMoveDialog: () => void;
	closeChainedMoveDialog: () => void;

	chainedMoveSequenceIndex: number | null;
	updateChainedMoveSequenceIndex: (index: number) => void;
	clearChainedMoveSequenceIndex: () => void;
}

const useAddChainedMoveDialogStore = create<AddChainedMoveDialogStore>((set) => ({
	isChainedMoveDialogOpen: false,
	openChainedMoveDialog: () => set({ isChainedMoveDialogOpen: true }),
	closeChainedMoveDialog: () => set({ isChainedMoveDialogOpen: false }),

	chainedMoveSequenceIndex: null,
	updateChainedMoveSequenceIndex: (index) => set({ chainedMoveSequenceIndex: index }),
	clearChainedMoveSequenceIndex: () => set({ chainedMoveSequenceIndex: null }),
}));

export default useAddChainedMoveDialogStore;