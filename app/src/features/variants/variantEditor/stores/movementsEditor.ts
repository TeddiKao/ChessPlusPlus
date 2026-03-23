import { create } from "zustand";

type MovementsEditorChanges = {
	forMovement: boolean;
	forCapture: boolean;
	offsetX: number;
	offsetY: number;
	range: number;
};

type MovementsEditorStore = {
	activeMovementName: string | null;
	updateActiveMovementName: (newMovementName: string) => void;
	clearActiveMovementName: () => void;

	movementsEditorChanges: Partial<MovementsEditorChanges>;
	addMovementsEditorChanges: (
		changes: Partial<MovementsEditorChanges>,
	) => void;
	removeMovementsEditorChanges: (
		changeKeys: (keyof MovementsEditorChanges)[],
	) => void;
	clearMovementsEditorChanges: () => void;

	forMovement: boolean | null;
	toggleForMovement: () => void;
	clearForMovement: () => void;

	forCapture: boolean | null;
	toggleForCapture: () => void;
	clearForCapture: () => void;

	offsetX: number | null;
	updateOffsetX: (newOffset: number) => void;
	clearOffsetX: () => void;

	offsetY: number | null;
	updateOffsetY: (newOffset: number) => void;
	clearOffsetY: () => void;

	range: number | "inf" | null;
	updateRange: (newRange: number | "inf") => void;
	clearRange: () => void;
};

const useMovementsEditorStore = create<MovementsEditorStore>((set) => ({
	activeMovementName: null,
	updateActiveMovementName: (newMovementName) =>
		set({ activeMovementName: newMovementName }),
	clearActiveMovementName: () => set({ activeMovementName: null }),

	movementsEditorChanges: {},
	addMovementsEditorChanges: (changes) =>
		set((state) => ({
			movementsEditorChanges: {
				...state.movementsEditorChanges,
				...changes,
			},
		})),

	removeMovementsEditorChanges: (changeKeys) => {
		set((state) => {
			const newChanges = structuredClone(state.movementsEditorChanges);

			for (const key of changeKeys) {
				delete newChanges[key];
			}

			return { movementsEditorChanges: newChanges };
		});
	},

	clearMovementsEditorChanges: () => set({ movementsEditorChanges: {} }),

	forMovement: null,
	toggleForMovement: () =>
		set((state) => ({ forMovement: !state.forMovement })),
	clearForMovement: () => set({ forMovement: null }),

	forCapture: null,
	toggleForCapture: () => set((state) => ({ forCapture: !state.forCapture })),
	clearForCapture: () => set({ forCapture: null }),

	offsetX: null,
	updateOffsetX: (newOffset) => set({ offsetX: newOffset }),
	clearOffsetX: () => set({ offsetX: null }),

	offsetY: null,
	updateOffsetY: (newOffset) => set({ offsetY: newOffset }),
	clearOffsetY: () => set({ offsetY: null }),

	range: null,
	updateRange: (newRange) => set({ range: newRange }),
	clearRange: () => set({ range: null }),
}));

export default useMovementsEditorStore;
