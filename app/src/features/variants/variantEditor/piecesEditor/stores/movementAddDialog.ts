import { create } from "zustand";

type MovementAddDialogStore = {
	isMovementAddDialogOpen: boolean;
	openMovementAddDialog: () => void;
	closeMovementAddDialog: () => void;

	movementsAdded: string[];
	addMovement: (movement: string) => void;
	removeMovement: (movement: string) => void;
	clearMovements: () => void;
};

const useMovementAddDialogStore = create<MovementAddDialogStore>((set) => ({
	isMovementAddDialogOpen: false,
	openMovementAddDialog: () => set({ isMovementAddDialogOpen: true }),
	closeMovementAddDialog: () => set({ isMovementAddDialogOpen: false }),

	movementsAdded: [],
	addMovement: (movement) =>
		set((state) => ({
			movementsAdded: [...state.movementsAdded, movement],
		})),
	removeMovement: (movement) =>
		set((state) => ({
			movementsAdded: state.movementsAdded.filter((m) => m !== movement),
		})),
	clearMovements: () => set({ movementsAdded: [] }),
}));

export default useMovementAddDialogStore;
