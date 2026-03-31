import { create } from "zustand";

type PieceDeletionAlertStore = {
	isPieceDeletionAlertOpen: boolean;
	openPieceDeletionAlert: () => void;
	closePieceDeletionAlert: () => void;
}

const usePieceDeletionAlertStore = create<PieceDeletionAlertStore>((set) => ({
	isPieceDeletionAlertOpen: false,
	openPieceDeletionAlert: () => set({ isPieceDeletionAlertOpen: true }),
	closePieceDeletionAlert: () => set({ isPieceDeletionAlertOpen: false }),
}));

export default usePieceDeletionAlertStore;