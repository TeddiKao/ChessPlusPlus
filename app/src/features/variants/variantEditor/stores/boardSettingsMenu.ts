import { create } from "zustand";

type BoardSettingsMenuStore = {
    isBoardSettingsMenuOpen: boolean;
    openBoardSettingsMenu: () => void;
    closeBoardSettingsMenu: () => void;
}

const useBoardSettingsMenuStore = create<BoardSettingsMenuStore>((set) => ({
    isBoardSettingsMenuOpen: false,
    openBoardSettingsMenu: () => set({ isBoardSettingsMenuOpen: true }),
    closeBoardSettingsMenu: () => set({ isBoardSettingsMenuOpen: false }),
}));

export default useBoardSettingsMenuStore;