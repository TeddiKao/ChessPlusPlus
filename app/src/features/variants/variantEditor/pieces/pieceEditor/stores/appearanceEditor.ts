import { create } from "zustand";

type AppearanceEditorStore = {
	pieceName: string | null;
	updatePieceName: (newPieceName: string) => void;
	clearPieceName: () => void;

	whitePieceImage: Blob | null;
	updateWhitePieceImage: (newImage: Blob) => void;
	clearWhitePieceImage: () => void;

	blackPieceImage: Blob | null;
	updateBlackPieceImage: (newImage: Blob) => void;
	clearBlackPieceImage: () => void;
};

const useAppearanceEditorStore = create<AppearanceEditorStore>((set) => ({
	pieceName: null,
	updatePieceName: (newPieceName) => set({ pieceName: newPieceName }),
	clearPieceName: () => set({ pieceName: null }),

	whitePieceImage: null,
	updateWhitePieceImage: (newImage) => set({ whitePieceImage: newImage }),
	clearWhitePieceImage: () => set({ whitePieceImage: null }),

	blackPieceImage: null,
	updateBlackPieceImage: (newImage) => set({ blackPieceImage: newImage }),
	clearBlackPieceImage: () => set({ blackPieceImage: null }),
}));

export default useAppearanceEditorStore;
