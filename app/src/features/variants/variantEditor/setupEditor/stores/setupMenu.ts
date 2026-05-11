import { create } from "zustand";

type SetupMenuStore = {
	isPlayersExpanded: boolean;
	expandPlayers: () => void;
	collapsePlayers: () => void;

	isPiecesExpanded: boolean;
	expandPieces: () => void;
	collapsePieces: () => void;
}

const useSetupMenuStore = create<SetupMenuStore>((set) => ({
	isPlayersExpanded: false,
	expandPlayers: () => set({ isPlayersExpanded: true }),
	collapsePlayers: () => set({ isPlayersExpanded: false }),

	isPiecesExpanded: false,
	expandPieces: () => set({ isPiecesExpanded: true }),
	collapsePieces: () => set({ isPiecesExpanded: false }),
}))

export default useSetupMenuStore;