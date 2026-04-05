import { create } from "zustand";

type ChainedMoveSequenceCreationDialogStore = {
	isChainedMoveSequenceCreationDialogOpen: boolean;
	openChainedMoveSequenceCreationDialog: () => void;
	closeChainedMoveSequenceCreationDialog: () => void;

	searchQuery: string;
	updateSearchQuery: (query: string) => void;
	clearSearchQuery: () => void;

	selectedMovements: [number, string][];
	selectMovement: (movementName: string) => void;
	deselectMovement: (movementName: string) => void;
	clearSelectedMovements: () => void;
};

const useChainedMoveSequenceCreationDialogStore =
	create<ChainedMoveSequenceCreationDialogStore>((set) => ({
		isChainedMoveSequenceCreationDialogOpen: false,
		openChainedMoveSequenceCreationDialog: () =>
			set({ isChainedMoveSequenceCreationDialogOpen: true }),
		closeChainedMoveSequenceCreationDialog: () =>
			set({ isChainedMoveSequenceCreationDialogOpen: false }),

		searchQuery: "",
		updateSearchQuery: (query) => set({ searchQuery: query }),
		clearSearchQuery: () => set({ searchQuery: "" }),

		selectedMovements: [],
		selectMovement: (movementName) =>
			set((state) => ({
				selectedMovements: [...state.selectedMovements, [state.selectedMovements.length, movementName]],
			})),
		deselectMovement: (movementName) =>
			set((state) => ({
				selectedMovements: state.selectedMovements.filter(
					(m) => m[1] !== movementName,
				).map((m, index) => ([index, m[1]])),
			})),
			
		clearSelectedMovements: () => set({ selectedMovements: [] }),
	}));

export default useChainedMoveSequenceCreationDialogStore;
