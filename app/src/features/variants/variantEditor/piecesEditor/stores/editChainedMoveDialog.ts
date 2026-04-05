import { create } from "zustand";

type EditChainedMoveDialogStore = {
	isEditChainedMoveDialogOpen: boolean;
	openEditChainedMoveDialog: () => void;
	closeEditChainedMoveDialog: () => void;

	sequenceIndex: number | null;
	updateSequenceIndex: (sequenceIndex: number) => void;
	clearSequenceIndex: () => void;

	nodeIndex: number | null;
	updateNodeIndex: (nodeIndex: number) => void;
	clearNodeIndex: () => void;

	newMovementName: string;
	updateNewMovementName: (newMovementName: string) => void;
	clearNewMovementName: () => void;
};

const useEditChainedMoveDialogStore = create<EditChainedMoveDialogStore>((set) => ({
	isEditChainedMoveDialogOpen: false,
	openEditChainedMoveDialog: () => set({ isEditChainedMoveDialogOpen: true }),
	closeEditChainedMoveDialog: () => set({ isEditChainedMoveDialogOpen: false }),

	sequenceIndex: null,
	updateSequenceIndex: (sequenceIndex: number) => set({ sequenceIndex }),
	clearSequenceIndex: () => set({ sequenceIndex: null }),

	nodeIndex: null,
	updateNodeIndex: (nodeIndex: number) => set({ nodeIndex }),
	clearNodeIndex: () => set({ nodeIndex: null }),

	newMovementName: "",
	updateNewMovementName: (newMovementName: string) => set({ newMovementName }),
	clearNewMovementName: () => set({ newMovementName: "" }),
}));

export default useEditChainedMoveDialogStore;	