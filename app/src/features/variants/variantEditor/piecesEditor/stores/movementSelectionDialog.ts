import { create } from "zustand";

type MovementSelectionDialogStore = {
	isMovementSelectionDialogOpen: boolean;
	openMovementSelectionDialog: () => void;
	closeMovementSelectionDialog: () => void;
}

const useMovementSelectionDialogStore = create<MovementSelectionDialogStore>((set) => ({
	isMovementSelectionDialogOpen: false,
	openMovementSelectionDialog: () => set({ isMovementSelectionDialogOpen: true }),
	closeMovementSelectionDialog: () => set({ isMovementSelectionDialogOpen: false }),
}))

export default useMovementSelectionDialogStore;