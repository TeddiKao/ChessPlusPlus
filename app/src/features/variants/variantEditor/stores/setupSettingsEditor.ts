import { create } from "zustand";

type SetupSettingsChanges = {
	boardXSize: number;
	boardYSize: number;
};

type SetupSettingsEditorStore = {
	boardXSize: number | null;
	updateBoardXSize: (newSize: number) => void;
	clearBoardXSize: () => void;

	boardYSize: number | null;
	updateBoardYSize: (newSize: number) => void;
	clearBoardYSize: () => void;

	setupSettingsChanges: Partial<SetupSettingsChanges>;
	addSetupSettingsChanges: (changes: Partial<SetupSettingsChanges>) => void;
	removeSetupSettingsChanges: (
		changeKeys: (keyof SetupSettingsChanges)[],
	) => void;
	clearSetupSettingsChanges: () => void;
};

const useSetupSettingsEditorStore = create<SetupSettingsEditorStore>((set) => ({
	boardXSize: null,
	updateBoardXSize: (newSize) => set({ boardXSize: newSize }),
	clearBoardXSize: () => set({ boardXSize: null }),

	boardYSize: null,
	updateBoardYSize: (newSize) => set({ boardYSize: newSize }),
	clearBoardYSize: () => set({ boardYSize: null }),

	setupSettingsChanges: {},
	addSetupSettingsChanges: (changes) =>
		set((state) => ({
			setupSettingsChanges: {
				...state.setupSettingsChanges,
				...changes,
			},
		})),
	removeSetupSettingsChanges: (changeKeys) => {
		set((state) => {
			const newChanges = structuredClone(state.setupSettingsChanges);

			for (const key of changeKeys) {
				delete newChanges[key];
			}

			return { setupSettingsChanges: newChanges };
		});
	},

	clearSetupSettingsChanges: () => set({ setupSettingsChanges: {} }),
}));

export default useSetupSettingsEditorStore;
