import { create } from "zustand";

type PieceMovementEditorStore = {
	activeMovementName: string | null;
	updateActiveMovementName: (newMovementName: string) => void;
	clearActiveMovementName: () => void;

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
	activeMovementName: null,
	updateActiveMovementName: (newMovementName) =>
		set({ activeMovementName: newMovementName }),
	clearActiveMovementName: () => set({ activeMovementName: null }),

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
