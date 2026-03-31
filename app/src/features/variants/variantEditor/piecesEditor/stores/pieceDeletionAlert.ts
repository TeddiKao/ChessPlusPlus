import { create } from "zustand";

type PieceDeletionAlertStore = {
	isPieceDeletionAlertOpen: boolean;
	openPieceDeletionAlert: () => void;
	closePieceDeletionAlert: () => void;

	pieceToDelete: string | null;
	updatePieceToDelete: (piece: string) => void;
}

const usePieceDeletionAlertStore = create<PieceDeletionAlertStore>((set) => ({
	isPieceDeletionAlertOpen: false,
	openPieceDeletionAlert: () => set({ isPieceDeletionAlertOpen: true }),
	closePieceDeletionAlert: () => set({ isPieceDeletionAlertOpen: false, pieceToDelete: null }),

	pieceToDelete: null,
	updatePieceToDelete: (piece) => set({ pieceToDelete: piece }),
}));

export default usePieceDeletionAlertStore;