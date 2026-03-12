import { create } from "zustand";

type VariantDeleteAlertStore = {
	isOpen: boolean;
	openAlert: () => void;
	closeAlert: () => void;
};

const useVariantDeleteAlertStore = create<VariantDeleteAlertStore>((set) => ({
	isOpen: false,
	openAlert: () => set({ isOpen: true }),
	closeAlert: () => set({ isOpen: false }),
}));

export default useVariantDeleteAlertStore;
