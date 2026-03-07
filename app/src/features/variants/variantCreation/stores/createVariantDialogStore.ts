import { create } from "zustand";

type CreateVariantDialogStore = {
	isOpen: boolean;
	openDialog: () => void;
	closeDialog: () => void;
};

const useCreateVariantDialogStore = create<CreateVariantDialogStore>((set) => ({
	isOpen: false,
	openDialog: () => set({ isOpen: true }),
	closeDialog: () => set({ isOpen: false }),
}));

export default useCreateVariantDialogStore;
