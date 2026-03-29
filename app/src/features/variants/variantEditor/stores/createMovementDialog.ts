import { create } from "zustand";

type CreateMovementDialogStore = {
    isCreateMovementDialogOpen: boolean;
    openCreateMovementDialog: () => void;
    closeCreateMovementDialog: () => void;

    movementName: string;
    updateMovementName: (movementName: string) => void;
    clearMovementName: () => void;
}

const useCreateMovementDialogStore = create<CreateMovementDialogStore>((set) => ({
    isCreateMovementDialogOpen: false,
    openCreateMovementDialog: () => set({ isCreateMovementDialogOpen: true }),
    closeCreateMovementDialog: () => set({ isCreateMovementDialogOpen: false }),
    
    movementName: "",
    updateMovementName: (movementName: string) => set({ movementName }),
    clearMovementName: () => set({ movementName: "" }),
}));

export default useCreateMovementDialogStore;
