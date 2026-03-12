import { create } from "zustand";

type VariantRenameDialogStore = {
	isOpen: boolean;
	openDialog: (variantIdToRename: string) => void;
	closeDialog: () => void;

	variantIdToRename: string | null;
	updateVariantIdToRename: (variantId: string) => void;
	clearVariantIdToRename: () => void;

	newVariantName: string;
	updateNewVariantName: (newVariantName: string) => void;
	clearNewVariantName: () => void;
};

const useVariantRenameDialogStore = create<VariantRenameDialogStore>((set) => ({
	isOpen: false,
	openDialog: (variantIdToRename) => set({ isOpen: true, variantIdToRename }),
	closeDialog: () =>
		set({ isOpen: false, variantIdToRename: null, newVariantName: "" }),

	variantIdToRename: null,
	updateVariantIdToRename: (variantId) =>
		set({ variantIdToRename: variantId }),
	clearVariantIdToRename: () => set({ variantIdToRename: null }),

	newVariantName: "",
	updateNewVariantName: (newVariantName) => set({ newVariantName }),
	clearNewVariantName: () => set({ newVariantName: "" }),
}));

export default useVariantRenameDialogStore;
