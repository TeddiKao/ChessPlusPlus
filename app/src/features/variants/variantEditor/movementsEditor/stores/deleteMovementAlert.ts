import { create } from "zustand";

type DeleteMovementAlertStore = {
    isDeleteMovementAlertOpen: boolean;
    openDeleteMovementAlert: () => void;
    closeDeleteMovementAlert: () => void;

    movementToDelete: string | null;
    updateMovementToDelete: (movementId: string) => void;
    clearMovementToDelete: () => void;
}

const useDeleteMovementAlertStore = create<DeleteMovementAlertStore>()((set) => ({
    isDeleteMovementAlertOpen: false,
    openDeleteMovementAlert: () => set({ isDeleteMovementAlertOpen: true }),
    closeDeleteMovementAlert: () => set({ isDeleteMovementAlertOpen: false }),
    
    movementToDelete: null,
    updateMovementToDelete: (movementId: string) => set({ movementToDelete: movementId }),
    clearMovementToDelete: () => set({ movementToDelete: null }),
}));

export default useDeleteMovementAlertStore;