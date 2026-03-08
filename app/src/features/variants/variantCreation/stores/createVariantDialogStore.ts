import { create } from "zustand";

type CreateVariantDialogStore = {
	isOpen: boolean;
	openDialog: () => void;
	closeDialog: () => void;

	variantName: string;
	updateVariantName: (name: string) => void;
	clearVariantName: () => void;
};

const useCreateVariantDialogStore = create<CreateVariantDialogStore>((set) => ({
	isOpen: false,
	openDialog: () => set({ isOpen: true }),
	closeDialog: () => set({ isOpen: false }),

	variantName: "",
	updateVariantName: (name) => set({ variantName: name }),
	clearVariantName: () => set({ variantName: "" }),
}));

export default useCreateVariantDialogStore;
