import { create } from "zustand";

type AppearanceEditorStore = {
	pieceName: string;
	updatePieceName: (newPieceName: string) => void;

	pieceImageWhite: string;
	updatePieceImageWhite: (newPieceImageWhite: string) => void;

	pieceImageBlack: string;
	updatePieceImageBlack: (newPieceImageBlack: string) => void;
};

const useAppearanceEditorStore = create<AppearanceEditorStore>((set) => ({
	pieceName: "",
	updatePieceName: (newPieceName) => set({ pieceName: newPieceName }),

	pieceImageWhite: "",
	updatePieceImageWhite: (newPieceImageWhite) =>
		set({ pieceImageWhite: newPieceImageWhite }),

	pieceImageBlack: "",
	updatePieceImageBlack: (newPieceImageBlack) =>
		set({ pieceImageBlack: newPieceImageBlack }),
}));

export default useAppearanceEditorStore;
