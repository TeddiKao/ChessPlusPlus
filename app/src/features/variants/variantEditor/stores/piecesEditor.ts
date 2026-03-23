import { create } from "zustand";

type PiecesEditorStore = {
	activePiece: string | null;
	updateActivePiece: (newActivePiece: string) => void;
	clearActivePiece: () => void;

	activePieceMovements: string[];
	addMovementToActivePiece: (movementName: string) => void;
	removeMovementFromActivePiece: (movementToRemove: string) => void;
	clearMovementsFromActivePiece: () => void;
};

const usePiecesEditorStore = create<PiecesEditorStore>((set) => ({
	activePiece: null,
	updateActivePiece: (newPiece) => set({ activePiece: newPiece }),
	clearActivePiece: () => set({ activePiece: null }),

	activePieceMovements: [],
	addMovementToActivePiece: (movementName) =>
		set((state) => ({
			activePieceMovements: [...state.activePieceMovements, movementName],
		})),
	removeMovementFromActivePiece: (movementToRemove) =>
		set((state) => ({
			activePieceMovements: state.activePieceMovements.filter(
				(movementName) => movementName !== movementToRemove,
			),
		})),

	clearMovementsFromActivePiece: () => {
		set({ activePieceMovements: [] });
	},
}));

export default usePiecesEditorStore;
