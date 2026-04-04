import { create } from "zustand";

type MovementSelectionDialogStore = {
	isMovementSelectionDialogOpen: boolean;
	openMovementSelectionDialog: () => void;
	closeMovementSelectionDialog: () => void;

	pieceName: string | null;
	updatePieceName: (pieceName: string) => void;
	clearPieceName: () => void;

	selectedMovements: string[];
	selectMovement: (movement: string) => void;
	deselectMovement: (movement: string) => void;
	clearSelectedMovements: () => void;

	searchQuery: string;
	updateSearchQuery: (query: string) => void;
	clearSearchQuery: () => void;
}

const useMovementSelectionDialogStore = create<MovementSelectionDialogStore>((set) => ({
	isMovementSelectionDialogOpen: false,
	openMovementSelectionDialog: () => set({ isMovementSelectionDialogOpen: true }),
	closeMovementSelectionDialog: () => set({ isMovementSelectionDialogOpen: false }),

	pieceName: null,
	updatePieceName: (pieceName: string) => set({ pieceName }),
	clearPieceName: () => set({ pieceName: null }),

	selectedMovements: [],
	selectMovement: (movement: string) => set((state) => ({ selectedMovements: [...state.selectedMovements, movement] })),
	deselectMovement: (movement: string) => set((state) => ({ selectedMovements: state.selectedMovements.filter((m) => m !== movement) })),
	clearSelectedMovements: () => set({ selectedMovements: [] }),

	searchQuery: "",
	updateSearchQuery: (query: string) => set({ searchQuery: query }),
	clearSearchQuery: () => set({ searchQuery: "" }),
}))

export default useMovementSelectionDialogStore;