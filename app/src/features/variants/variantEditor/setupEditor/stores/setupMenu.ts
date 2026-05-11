import { create } from "zustand";

type SetupMenuStore = {
	isBoardSizeExpanded: boolean;
	expandBoardSize: () => void;
	collapseBoardSize: () => void;

	isPlayersExpanded: boolean;
	expandPlayers: () => void;
	collapsePlayers: () => void;

	isPiecesExpanded: boolean;
	expandPieces: () => void;
	collapsePieces: () => void;
}

const useSetupMenuStore = create<SetupMenuStore>((set) => ({
	isBoardSizeExpanded: false,
	expandBoardSize: () => set({ isBoardSizeExpanded: true }),
	collapseBoardSize: () => set({ isBoardSizeExpanded: false }),

	isPlayersExpanded: false,
	expandPlayers: () => set({ isPlayersExpanded: true }),
	collapsePlayers: () => set({ isPlayersExpanded: false }),

	isPiecesExpanded: false,
	expandPieces: () => set({ isPiecesExpanded: true }),
	collapsePieces: () => set({ isPiecesExpanded: false }),
}))

export default useSetupMenuStore;