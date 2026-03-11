import { create } from "zustand";

type VariantDeleteAlertStore = {
	isOpen: boolean;
	openDialog: () => void;
	closeDialog: () => void;
};

const useVariantDeleteAlertStore = create<VariantDeleteAlertStore>((set) => ({
	isOpen: false,
	openDialog: () => set({ isOpen: true }),
	closeDialog: () => set({ isOpen: false }),
}));

export default useVariantDeleteAlertStore;
