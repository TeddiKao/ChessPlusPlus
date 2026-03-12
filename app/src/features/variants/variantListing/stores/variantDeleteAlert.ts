import { create } from "zustand";

type VariantDeleteAlertStore = {
	isOpen: boolean;
	openAlert: (variantId: string) => void;
	closeAlert: () => void;

	variantIdToDelete: string | null;
	updateVariantIdToDelete: (variantId: string) => void;
	clearVariantIdToDelete: () => void;
};

const useVariantDeleteAlertStore = create<VariantDeleteAlertStore>((set) => ({
	isOpen: false,
	openAlert: (variantId) =>
		set({ isOpen: true, variantIdToDelete: variantId }),
	closeAlert: () => set({ isOpen: false }),

	variantIdToDelete: null,
	updateVariantIdToDelete: (variantId) =>
		set({ variantIdToDelete: variantId }),
	clearVariantIdToDelete: () => set({ variantIdToDelete: null }),
}));

export default useVariantDeleteAlertStore;
