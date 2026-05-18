import { create } from "zustand";

type VariantPlaySelectionDialogStore = {
	isVariantPlaySelectionDialogOpen: boolean;
	openVariantPlaySelectionDialog: () => void;
	closeVariantPlaySelectionDialog: () => void;
}

const useVariantPlaySelectionDialogStore = create<VariantPlaySelectionDialogStore>((set) => ({
	isVariantPlaySelectionDialogOpen: false,
	openVariantPlaySelectionDialog: () => set({ isVariantPlaySelectionDialogOpen: true }),
	closeVariantPlaySelectionDialog: () => set({ isVariantPlaySelectionDialogOpen: false }),
}));

export default useVariantPlaySelectionDialogStore;