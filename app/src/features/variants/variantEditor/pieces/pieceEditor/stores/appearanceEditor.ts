import { create } from "zustand";

type AppearanceEditorStore = {
	pieceName: string;
	updatePieceName: (newPieceName: string) => void;

	whitePieceImage: Blob | null;
	updateWhitePieceImage: (newImage: Blob | null) => void;

	blackPieceImage: Blob | null;
	updateBlackPieceImage: (newImage: Blob | null) => void;
};

const useAppearanceEditorStore = create<AppearanceEditorStore>((set) => ({
	pieceName: "",
	updatePieceName: (newPieceName) => set({ pieceName: newPieceName }),

	whitePieceImage: null,
	updateWhitePieceImage: (newImage) => set({ whitePieceImage: newImage }),

	blackPieceImage: null,
	updateBlackPieceImage: (newImage) => set({ blackPieceImage: newImage }),
}));

export default useAppearanceEditorStore;
