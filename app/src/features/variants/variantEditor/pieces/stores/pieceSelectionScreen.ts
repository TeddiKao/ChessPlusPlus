import { create } from "zustand";

type PieceSelectionScreenStore = {
	isDefaultPiecesExpanded: boolean;
	expandDefaultPieces: () => void;
	collapseDefaultPieces: () => void;

	isCustomPiecesExpanded: boolean;
	expandCustomPieces: () => void;
	collapseCustomPieces: () => void;
};

const usePieceSelectionScreenStore = create<PieceSelectionScreenStore>(
	(set) => ({
		isDefaultPiecesExpanded: false,
		expandDefaultPieces: () => set({ isDefaultPiecesExpanded: true }),
		collapseDefaultPieces: () => set({ isDefaultPiecesExpanded: false }),

		isCustomPiecesExpanded: false,
		expandCustomPieces: () => set({ isCustomPiecesExpanded: true }),
		collapseCustomPieces: () => set({ isCustomPiecesExpanded: false }),
	}),
);

export default usePieceSelectionScreenStore;
