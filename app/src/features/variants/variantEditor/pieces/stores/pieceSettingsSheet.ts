import { create } from "zustand";

type PieceSettingsStore = {
	currentSheetMode: "pieceSelection" | "pieceConfiguration";
	updateCurrentSheetMode: (
		mode: "pieceSelection" | "pieceConfiguration",
	) => void;
};

const usePieceSettingsStore = create<PieceSettingsStore>((set) => ({
	currentSheetMode: "pieceSelection",
	updateCurrentSheetMode: (mode) => set({ currentSheetMode: mode }),
}));

export default usePieceSettingsStore;
