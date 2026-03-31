import { create } from "zustand";

type PieceCreationDialogStore = {
	isPieceCreationDialogOpen: boolean;
	openPieceCreationDialog: () => void;
	closePieceCreationDialog: () => void;

	pieceName: string;
	updatePieceName: (name: string) => void;
	clearPieceName: () => void;

	pieceNameErrors: string[];
	updatePieceNameErrors: (errors: string[]) => void;
	clearPieceNameErrors: () => void;
}

const usePieceCreationDialogStore = create<PieceCreationDialogStore>((set) => ({
	isPieceCreationDialogOpen: false,
	openPieceCreationDialog: () => set({ isPieceCreationDialogOpen: true }),
	closePieceCreationDialog: () => set({ isPieceCreationDialogOpen: false }),

	pieceName: "",
	updatePieceName: (name) => set({ pieceName: name }),
	clearPieceName: () => set({ pieceName: "" }),

	pieceNameErrors: [],
	updatePieceNameErrors: (errors) => set({ pieceNameErrors: errors }),
	clearPieceNameErrors: () => set({ pieceNameErrors: [] }),
}));

export default usePieceCreationDialogStore;