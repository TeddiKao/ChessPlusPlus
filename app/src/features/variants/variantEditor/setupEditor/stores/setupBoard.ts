import { create } from "zustand";

type SetupBoardStore = {
	isFlipped: boolean;
	flipBoard: () => void;
	unflipBoard: () => void;
}

const useSetupBoardStore = create<SetupBoardStore>((set) => ({
	isFlipped: false,
	flipBoard: () => set({ isFlipped: true }),
	unflipBoard: () => set({ isFlipped: false }),
}))

export default useSetupBoardStore;