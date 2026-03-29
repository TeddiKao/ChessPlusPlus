import { create } from "zustand";

type DeleteMovementAlertStore = {
    isDeleteMovementAlertOpen: boolean;
    openDeleteMovementAlert: () => void;
    closeDeleteMovementAlert: () => void;
}

const useDeleteMovementAlertStore = create<DeleteMovementAlertStore>()((set) => ({
    isDeleteMovementAlertOpen: false,
    openDeleteMovementAlert: () => set({ isDeleteMovementAlertOpen: true }),
    closeDeleteMovementAlert: () => set({ isDeleteMovementAlertOpen: false }),
}));

export default useDeleteMovementAlertStore;