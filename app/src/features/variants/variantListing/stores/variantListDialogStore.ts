import { create } from "zustand";

type VariantListDialogStore = {
	isOpen: boolean;
	openDialog: () => void;
	closeDialog: () => void;

	selectedVariantId: string | null;
	updateSelectedVariantId: (variantId: string) => void;
	clearSelectedVariantId: () => void;
};

const useVariantListDialogStore = create<VariantListDialogStore>((set) => ({
	isOpen: false,
	openDialog: () => set({ isOpen: true }),
	closeDialog: () => set({ isOpen: false, selectedVariantId: null }),

	selectedVariantId: null,
	updateSelectedVariantId: (variantId) =>
		set({ selectedVariantId: variantId }),
	clearSelectedVariantId: () => set({ selectedVariantId: null }),
}));

export default useVariantListDialogStore;
