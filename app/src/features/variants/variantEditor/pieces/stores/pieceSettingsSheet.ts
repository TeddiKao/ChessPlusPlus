import { create } from "zustand";

type PieceSettingsStore = {
	isOpen: boolean;
	openPieceSettingsSheet: () => void;
	closePieceSettingsSheet: () => void;

	currentSheetMode: "pieceSelection" | "pieceConfiguration";
	updateCurrentSheetMode: (
		mode: "pieceSelection" | "pieceConfiguration",
	) => void;
};

const usePieceSettingsStore = create<PieceSettingsStore>((set) => ({
	isOpen: false,
	openPieceSettingsSheet: () => set({ isOpen: true }),
	closePieceSettingsSheet: () => set({ isOpen: false }),

	currentSheetMode: "pieceSelection",
	updateCurrentSheetMode: (mode) => set({ currentSheetMode: mode }),
}));

export default usePieceSettingsStore;
