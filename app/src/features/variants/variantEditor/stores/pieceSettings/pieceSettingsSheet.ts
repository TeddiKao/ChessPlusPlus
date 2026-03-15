import { create } from "zustand";

type PieceSettingsStore = {
	isOpen: boolean;
	openPieceSettingsSheet: () => void;
	closePieceSettingsSheet: () => void;

	isDefaultPiecesExpanded: boolean;
	expandDefaultPieces: () => void;
	collapseDefaultPieces: () => void;

	isCustomPiecesExpanded: boolean;
	expandCustomPieces: () => void;
	collapseCustomPieces: () => void;
};

const usePieceSettingsStore = create<PieceSettingsStore>((set) => ({
	isOpen: false,
	openPieceSettingsSheet: () => set({ isOpen: true }),
	closePieceSettingsSheet: () => set({ isOpen: false }),

	isDefaultPiecesExpanded: false,
	expandDefaultPieces: () => set({ isDefaultPiecesExpanded: true }),
	collapseDefaultPieces: () => set({ isDefaultPiecesExpanded: false }),

	isCustomPiecesExpanded: false,
	expandCustomPieces: () => set({ isCustomPiecesExpanded: true }),
	collapseCustomPieces: () => set({ isCustomPiecesExpanded: false }),
}));

export default usePieceSettingsStore;
