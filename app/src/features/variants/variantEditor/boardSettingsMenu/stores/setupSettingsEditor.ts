import { create } from "zustand";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";

type SetupSettingsChanges = {
	boardXSize: number;
	boardYSize: number;
};

type SetupSettingsEditorStore = {
	boardXSize: string | null;
	updateBoardXSize: (newSize: string) => void;
	clearBoardXSize: () => void;

	boardYSize: string | null;
	updateBoardYSize: (newSize: string) => void;
	clearBoardYSize: () => void;

	setupSettingsChanges: Partial<SetupSettingsChanges>;
	addSetupSettingsChanges: (changes: Partial<SetupSettingsChanges>) => void;
	removeSetupSettingsChanges: (
		changeKeys: (keyof SetupSettingsChanges)[],
	) => void;
	clearSetupSettingsChanges: () => void;

	commitToDraft: (keys?: (keyof SetupSettingsChanges)[]) => void;
};

const useSetupSettingsEditorStore = create<SetupSettingsEditorStore>(
	(set, get) => ({
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

		commitToDraft: (keys) => {
			const setupRulesDraft =
				useVariantDraftStore.getState().setupRulesDraft;
			if (!setupRulesDraft) return;

			const updateSetupRulesDraft =
				useVariantDraftStore.getState().updateSetupRulesDraft;
			const setupSettingsChanges = get().setupSettingsChanges;

			if (!keys) {
				const newDraft = {
					...setupRulesDraft,
					...setupSettingsChanges,
				};

				updateSetupRulesDraft(newDraft);
			} else {
				const changesToCommit = Object.fromEntries(
					Object.entries(setupSettingsChanges).filter(([key]) =>
						keys.includes(key as keyof SetupSettingsChanges),
					),
				);

				const newDraft = {
					...setupRulesDraft,
					...changesToCommit,
				};

				updateSetupRulesDraft(newDraft);
			}
		},
	}),
);

export default useSetupSettingsEditorStore;
