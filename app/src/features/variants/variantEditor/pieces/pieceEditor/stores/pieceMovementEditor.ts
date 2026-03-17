import { create } from "zustand";

type PieceMovementEditorStore = {
	movementName: string | null;
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

	offsetX: number | null;
	updateOffsetX: (newOffsetX: number) => void;

	offsetY: number | null;
	updateOffsetY: (newOffsetY: number) => void;

	range: number | "inf" | null;
	updateRange: (newRange: number | "inf") => void;
};

const usePieceMovementEditorStore = create<PieceMovementEditorStore>((set) => ({
	movementName: null,
	updateMovementName: (newMovementName) =>
		set({ movementName: newMovementName }),
	clearMovementName: () => set({ movementName: null }),

	appliesTo: "both",
	updateAppliesTo: (newAppliesTo) => set({ appliesTo: newAppliesTo }),

	forMovement: false,
	enableMovement: () => set({ forMovement: true }),
	disableMovement: () => set({ forMovement: false }),

	forCapture: false,
	enableCapture: () => set({ forCapture: true }),
	disableCapture: () => set({ forCapture: false }),

	offsetX: null,
	updateOffsetX: (newOffsetX) => set({ offsetX: newOffsetX }),

	offsetY: null,
	updateOffsetY: (newOffsetY) => set({ offsetY: newOffsetY }),

	range: 0,
	updateRange: (newRange) => set({ range: newRange }),
}));

export default usePieceMovementEditorStore;
