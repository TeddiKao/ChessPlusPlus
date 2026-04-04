import { create } from "zustand";

type AddChainedMoveDialogStore = {
	isChainedMoveDialogOpen: boolean;
	openChainedMoveDialog: () => void;
	closeChainedMoveDialog: () => void;

	chainedMoveSequenceIndex: number | null;
	updateChainedMoveSequenceIndex: (index: number) => void;
	clearChainedMoveSequenceIndex: () => void;

	movementToAdd: string;
	updateMovementToAdd: (movement: string) => void;
	clearMovementToAdd: () => void;
}

const useAddChainedMoveDialogStore = create<AddChainedMoveDialogStore>((set) => ({
	isChainedMoveDialogOpen: false,
	openChainedMoveDialog: () => set({ isChainedMoveDialogOpen: true }),
	closeChainedMoveDialog: () => set({ isChainedMoveDialogOpen: false }),

	chainedMoveSequenceIndex: null,
	updateChainedMoveSequenceIndex: (index) => set({ chainedMoveSequenceIndex: index }),
	clearChainedMoveSequenceIndex: () => set({ chainedMoveSequenceIndex: null }),

	movementToAdd: "",
	updateMovementToAdd: (movement) => set({ movementToAdd: movement }),
	clearMovementToAdd: () => set({ movementToAdd: "" }),
}));

export default useAddChainedMoveDialogStore;