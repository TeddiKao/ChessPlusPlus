import { create } from "zustand";

type CreateMovementDialogStore = {
    isCreateMovementDialogOpen: boolean;
    openCreateMovementDialog: () => void;
    closeCreateMovementDialog: () => void;
}

const useCreateMovementDialogStore = create<CreateMovementDialogStore>((set) => ({
    isCreateMovementDialogOpen: false,
    openCreateMovementDialog: () => set({ isCreateMovementDialogOpen: true }),
    closeCreateMovementDialog: () => set({ isCreateMovementDialogOpen: false }),
}));

export default useCreateMovementDialogStore;
