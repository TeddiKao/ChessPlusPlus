import { create } from "zustand";

type PieceMovementEditorStore = {
	expandedMovements: string[];
	expandMovement: (movementName: string) => void;
	collapseMovement: (movementName: string) => void;

	activeMovementName: string | null;
	updateMovementName: (newMovementName: string) => void;
	clearMovementName: () => void;

	appliesTo: "white" | "black" | "both";
	updateAppliesTo: (newAppliesTo: "white" | "black" | "both") => void;

	forMovement: boolean;
	enableMovement: () => void;
	disableMovement: () => void;

	forCapture: boolean;
	enableCapture: () => void;
	disableCapture: () => void;

	offsetX: number;
	updateOffsetX: (newOffsetX: number) => void;

	offsetY: number;
	updateOffsetY: (newOffsetY: number) => void;

	range: number | "inf";
	updateRange: (newRange: number | "inf") => void;
};

const usePieceMovementEditorStore = create<PieceMovementEditorStore>((set) => ({
	expandedMovements: [],
	expandMovement: (movementName) =>
		set((state) => ({
			expandedMovements: [...state.expandedMovements, movementName],
		})),

	collapseMovement: (movementName) =>
		set((state) => ({
			expandedMovements: state.expandedMovements.filter(
				(movement) => movement !== movementName,
			),
		})),

	activeMovementName: null,
	updateMovementName: (newMovementName) =>
		set({ activeMovementName: newMovementName }),
	clearMovementName: () => set({ activeMovementName: null }),

	appliesTo: "both",
	updateAppliesTo: (newAppliesTo) => set({ appliesTo: newAppliesTo }),

	forMovement: false,
	enableMovement: () => set({ forMovement: true }),
	disableMovement: () => set({ forMovement: false }),

	forCapture: false,
	enableCapture: () => set({ forCapture: true }),
	disableCapture: () => set({ forCapture: false }),

	offsetX: 0,
	updateOffsetX: (newOffsetX) => set({ offsetX: newOffsetX }),

	offsetY: 0,
	updateOffsetY: (newOffsetY) => set({ offsetY: newOffsetY }),

	range: 0,
	updateRange: (newRange) => set({ range: newRange }),
}));

export default usePieceMovementEditorStore;
