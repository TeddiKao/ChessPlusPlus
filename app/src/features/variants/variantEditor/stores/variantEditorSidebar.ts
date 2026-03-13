import { create } from "zustand";

type VariantEditorSidebar = {
	currentSelectedSetting: "board" | "pieces" | null;
	updateCurrentSelectedSetting: (setting: "board" | "pieces") => void;
	clearCurrentSelectedSetting: () => void;
};

const useVariantEditorSidebarStore = create<VariantEditorSidebar>((set) => ({
	currentSelectedSetting: null,
	updateCurrentSelectedSetting: (setting) =>
		set({ currentSelectedSetting: setting }),
	clearCurrentSelectedSetting: () => set({ currentSelectedSetting: null }),
}));

export default useVariantEditorSidebarStore;
