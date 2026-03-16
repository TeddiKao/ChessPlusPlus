import { create } from "zustand";

type VariantDraftStore = {
	currentVariantId: string;
	updateCurrentVariantId: (newId: string) => void;
	clearCurrentVariantId: () => void;
};

const useVariantDraftStore = create<VariantDraftStore>((set) => ({
	currentVariantId: "",
	updateCurrentVariantId: (newId) => set({ currentVariantId: newId }),
	clearCurrentVariantId: () => set({ currentVariantId: "" }),
}));

export default useVariantDraftStore;
