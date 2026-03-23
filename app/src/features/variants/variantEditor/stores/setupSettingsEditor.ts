import { create } from "zustand";

type SetupSettingsEditorStore = {
	boardXSize: number | null;
	updateBoardXSize: (newSize: number) => void;
	clearBoardXSize: () => void;

	boardYSize: number | null;
	updateBoardYSize: (newSize: number) => void;
	clearBoardYSize: () => void;
};

const useSetupSettingsEditorStore = create<SetupSettingsEditorStore>((set) => ({
	boardXSize: null,
	updateBoardXSize: (newSize) => set({ boardXSize: newSize }),
	clearBoardXSize: () => set({ boardXSize: null }),

	boardYSize: null,
	updateBoardYSize: (newSize) => set({ boardYSize: newSize }),
	clearBoardYSize: () => set({ boardYSize: null }),
}));

export default useSetupSettingsEditorStore;
