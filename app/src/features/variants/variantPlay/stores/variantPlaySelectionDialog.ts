import { create } from "zustand";

type VariantPlaySelectionDialogStore = {
	isVariantPlaySelectionDialogOpen: boolean;
	openVariantPlaySelectionDialog: () => void;
	closeVariantPlaySelectionDialog: () => void;

	selectedVariantId: string | null;
	updateSelectedVariantId: (variantId: string) => void;
	clearSelectedVariantId: () => void;
}

const useVariantPlaySelectionDialogStore = create<VariantPlaySelectionDialogStore>((set) => ({
	isVariantPlaySelectionDialogOpen: false,
	openVariantPlaySelectionDialog: () => set({ isVariantPlaySelectionDialogOpen: true }),
	closeVariantPlaySelectionDialog: () => set({ isVariantPlaySelectionDialogOpen: false }),

	selectedVariantId: null,
	updateSelectedVariantId: (variantId) => set({ selectedVariantId: variantId }),
	clearSelectedVariantId: () => set({ selectedVariantId: null }),
}));

export default useVariantPlaySelectionDialogStore;