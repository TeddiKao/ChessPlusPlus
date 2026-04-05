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

	onAddChainedMove:
		| ((movementToAdd: string, additionalInfo: Record<string, unknown>) => void)
		| null;
	updateOnAddChainedMove: (
		onAddChainedMove: (movementToAdd: string, additionalInfo: Record<string, unknown>) => void,
	) => void;
	clearOnAddChainedMove: () => void;

	additionalInfo: Record<string, unknown>;
	updateAdditionalInfo: (additionalInfo: Record<string, unknown>) => void;
	clearAdditionalInfo: () => void;

	errors: string[];
	addErrors: (errors: string[]) => void;
	clearErrors: () => void;
};

const useAddChainedMoveDialogStore = create<AddChainedMoveDialogStore>(
	(set) => ({
		isChainedMoveDialogOpen: false,
		openChainedMoveDialog: () => set({ isChainedMoveDialogOpen: true }),
		closeChainedMoveDialog: () => set({ isChainedMoveDialogOpen: false }),

		chainedMoveSequenceIndex: null,
		updateChainedMoveSequenceIndex: (index) =>
			set({ chainedMoveSequenceIndex: index }),
		clearChainedMoveSequenceIndex: () =>
			set({ chainedMoveSequenceIndex: null }),

		movementToAdd: "",
		updateMovementToAdd: (movement) => set({ movementToAdd: movement }),
		clearMovementToAdd: () => set({ movementToAdd: "" }),

		onAddChainedMove: null,
		updateOnAddChainedMove: (onAddChainedMove) => set({ onAddChainedMove }),
		clearOnAddChainedMove: () => set({ onAddChainedMove: null }),

		additionalInfo: {},
		updateAdditionalInfo: (additionalInfo) => set({ additionalInfo }),
		clearAdditionalInfo: () => set({ additionalInfo: {} }),

		errors: [],
		addErrors: (errors) => set((state) => ({ errors: [...state.errors, ...errors] })),
		clearErrors: () => set({ errors: [] }),
	}),
);

export default useAddChainedMoveDialogStore;
