import { create } from "zustand";

type PieceSettingsStore = {
	isOpen: boolean;
	openPieceSettingsSheet: () => void;
	closePieceSettingsSheet: () => void;
};

const usePieceSettingsStore = create<PieceSettingsStore>((set) => ({
	isOpen: false,
	openPieceSettingsSheet: () => set({ isOpen: true }),
	closePieceSettingsSheet: () => set({ isOpen: false }),
}));

export default usePieceSettingsStore;
