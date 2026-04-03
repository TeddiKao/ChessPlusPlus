import { create } from "zustand";

type MovementSelectionDialogStore = {
	isMovementSelectionDialogOpen: boolean;
	openMovementSelectionDialog: () => void;
	closeMovementSelectionDialog: () => void;

	selectedMovements: string[];
	selectMovement: (movement: string) => void;
	deselectMovement: (movement: string) => void;
	clearSelectedMovements: () => void;
}

const useMovementSelectionDialogStore = create<MovementSelectionDialogStore>((set) => ({
	isMovementSelectionDialogOpen: false,
	openMovementSelectionDialog: () => set({ isMovementSelectionDialogOpen: true }),
	closeMovementSelectionDialog: () => set({ isMovementSelectionDialogOpen: false }),

	selectedMovements: [],
	selectMovement: (movement: string) => set((state) => ({ selectedMovements: [...state.selectedMovements, movement] })),
	deselectMovement: (movement: string) => set((state) => ({ selectedMovements: state.selectedMovements.filter((m) => m !== movement) })),
	clearSelectedMovements: () => set({ selectedMovements: [] }),
}))

export default useMovementSelectionDialogStore;