import { create } from "zustand";

type PieceOwnershipSelectionDialogStore = {
	isPieceOwnershipSelectionDialogOpen: boolean;
	openPieceOwnershipSelectionDialog: () => void;
	closePieceOwnershipSelectionDialog: () => void;

	player: string | null;
	updatePlayer: (player: string) => void;
	clearPlayer: () => void;

	selectedPieces: string[];
	addPieceToSelection: (piece: string) => void;
	removePieceFromSelection: (piece: string) => void;
	clearSelection: () => void;

	searchQuery: string;
	updateSearchQuery: (query: string) => void;
	clearSearchQuery: () => void;
};

const usePieceOwnershipSelectionDialogStore = create<PieceOwnershipSelectionDialogStore>(
	(set) => ({
		isPieceOwnershipSelectionDialogOpen: false,
		openPieceOwnershipSelectionDialog: () => set({ isPieceOwnershipSelectionDialogOpen: true }),
		closePieceOwnershipSelectionDialog: () => set({ isPieceOwnershipSelectionDialogOpen: false }),

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

		searchQuery: "",
		updateSearchQuery: (query) => set({ searchQuery: query }),
		clearSearchQuery: () => set({ searchQuery: "" }),
	}),
);

export default usePieceOwnershipSelectionDialogStore;