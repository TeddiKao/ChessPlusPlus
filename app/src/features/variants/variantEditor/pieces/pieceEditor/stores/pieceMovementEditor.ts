import { create } from "zustand";
import useMovementRulesDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft/movementRulesDraft";

type MovementEditorChanges = {
	appliesTo: "white" | "black" | "both";
	forMovement: boolean;
	forCapture: boolean;
	offsetX: number;
	offsetY: number;
	range: number | "inf";
};

type PieceMovementEditorStore = {
	activeMovementName: string | null;
	updateActiveMovementName: (newMovementName: string) => void;
	clearActiveMovementName: () => void;

	activeMovementPath: number[] | null;
	updateActiveMovementPath: (newPath: number[]) => void;
	clearActiveMovementPath: () => void;

	appliesTo: "white" | "black" | "both";
	updateAppliesTo: (newAppliesTo: "white" | "black" | "both") => void;

	forMovement: boolean;
	enableMovement: () => void;
	disableMovement: () => void;
	updateForMovement: (forMovement: boolean) => void;

	forCapture: boolean;
	enableCapture: () => void;
	disableCapture: () => void;
	updateForCapture: (forMovement: boolean) => void;

	offsetX: number;
	updateOffsetX: (newOffsetX: number) => void;

	offsetY: number;
	updateOffsetY: (newOffsetY: number) => void;

	range: number | "inf";
	updateRange: (newRange: number | "inf") => void;

	movementEditorChanges: Partial<MovementEditorChanges>;
	addMovementEditorChanges: (changes: Partial<MovementEditorChanges>) => void;
	removeMovementEditorChanges: (
		keys: (keyof MovementEditorChanges)[],
	) => void;
	clearMovementEditorChanges: () => void;

	commitToDraft: (keys?: (keyof MovementEditorChanges)[]) => void;
};

const usePieceMovementEditorStore = create<PieceMovementEditorStore>(
	(set, get) => ({
		activeMovementName: null,
		updateActiveMovementName: (newMovementName) =>
			set({ activeMovementName: newMovementName }),
		clearActiveMovementName: () => set({ activeMovementName: null }),

		activeMovementPath: null,
		updateActiveMovementPath: (newPath) =>
			set({ activeMovementPath: newPath }),
		clearActiveMovementPath: () => set({ activeMovementPath: null }),

		appliesTo: "both",
		updateAppliesTo: (newAppliesTo) => set({ appliesTo: newAppliesTo }),

		forMovement: false,
		enableMovement: () => set({ forMovement: true }),
		disableMovement: () => set({ forMovement: false }),
		updateForMovement: (forMovement: boolean) => set({ forMovement }),

		forCapture: false,
		enableCapture: () => set({ forCapture: true }),
		disableCapture: () => set({ forCapture: false }),
		updateForCapture: (forCapture: boolean) => set({ forCapture }),

		offsetX: 0,
		updateOffsetX: (newOffsetX) => set({ offsetX: newOffsetX }),

		offsetY: 0,
		updateOffsetY: (newOffsetY) => set({ offsetY: newOffsetY }),

		range: 0,
		updateRange: (newRange) => set({ range: newRange }),

		movementEditorChanges: {},
		addMovementEditorChanges: (changes) =>
			set((state) => ({
				movementEditorChanges: {
					...state.movementEditorChanges,
					...changes,
				},
			})),

		removeMovementEditorChanges: (keys) =>
			set((state) => {
				const newState = structuredClone(state);
				for (const key of keys) {
					delete newState.movementEditorChanges[key];
				}

				return newState;
			}),

		clearMovementEditorChanges: () => set({ movementEditorChanges: {} }),

		commitToDraft: (keys) => {
			const updateMovementRules =
				useMovementRulesDraftStore.getState().updateMovementRules;
			const originalMovementRules =
				useMovementRulesDraftStore.getState().movementRules;

			const activeMovementName = get().activeMovementName;
			const movementEditorChanges = get().movementEditorChanges;

			if (!originalMovementRules) return;
			if (!activeMovementName) return;
			if (!movementEditorChanges) return;

			if (!keys) {
				updateMovementRules({
					...originalMovementRules,
					[activeMovementName]: {
						...originalMovementRules[activeMovementName],
						...movementEditorChanges,
					},
				});

				get().clearMovementEditorChanges();
			} else {
				const changesToCommit = Object.fromEntries(
					Object.entries(movementEditorChanges).filter(([key]) =>
						keys.includes(key as keyof MovementEditorChanges),
					),
				);

				updateMovementRules({
					...originalMovementRules,
					[activeMovementName]: {
						...originalMovementRules[activeMovementName],
						...changesToCommit,
					},
				});

				get().removeMovementEditorChanges(keys);
			}
		},
	}),
);

export default usePieceMovementEditorStore;
