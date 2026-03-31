import { create } from "zustand";

type PiecesEditorSheetStore = {
    currentMode: "pieceSelection" | "pieceEditing";
    updateCurrentMode: (newMode: "pieceSelection" | "pieceEditing") => void;
};

const usePiecesEditorSheetStore = create<PiecesEditorSheetStore>((set) => ({
    currentMode: "pieceSelection",
    updateCurrentMode: (newMode) => set({ currentMode: newMode }),
}));

export default usePiecesEditorSheetStore;
