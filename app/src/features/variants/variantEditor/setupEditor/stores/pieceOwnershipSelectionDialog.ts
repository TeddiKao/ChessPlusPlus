import { create } from "zustand";

type PieceOwnershipSelectionStore = {
	open: boolean;
	openDialog: () => void;
	closeDialog: () => void;

	player: string | null;
	updatePlayer: (player: string) => void;
	clearPlayer: () => void;

	selectedPieces: string[];
	addPieceToSelection: (piece: string) => void;
	removePieceFromSelection: (piece: string) => void;
	clearSelection: () => void;
};

const usePieceOwnershipSelectionStore = create<PieceOwnershipSelectionStore>(
	(set) => ({
		open: false,
		openDialog: () => set({ open: true }),
		closeDialog: () => set({ open: false }),

		player: null,
		updatePlayer: (player) => set({ player }),
		clearPlayer: () => set({ player: null }),

		selectedPieces: [],
		addPieceToSelection: (piece) =>
			set((state) => ({
				selectedPieces: [...state.selectedPieces, piece],
			})),

		removePieceFromSelection: (piece) =>
			set((state) => ({
				selectedPieces: state.selectedPieces.filter((p) => p !== piece),
			})),

		clearSelection: () => set({ selectedPieces: [] }),
	}),
);

export default usePieceOwnershipSelectionStore;