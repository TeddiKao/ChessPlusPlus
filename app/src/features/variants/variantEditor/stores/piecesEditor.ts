import { create } from "zustand";

type PieceEditorChanges = {
	pieceName: string;
	activePieceMovements: string[];
};

type PiecesEditorStore = {
	activePiece: string | null;
	updateActivePiece: (newActivePiece: string) => void;
	clearActivePiece: () => void;

	piecesEditorChanges: Partial<PieceEditorChanges>;
	addPieceEditorChanges: (changes: Partial<PieceEditorChanges>) => void;
	removePieceEditorChanges: (
		changeKeys: (keyof PieceEditorChanges)[],
	) => void;
	clearPieceEditorChanges: () => void;

	activePieceMovements: string[];
	addMovementToActivePiece: (movementName: string) => void;
	removeMovementFromActivePiece: (movementToRemove: string) => void;
	clearMovementsFromActivePiece: () => void;

	pieceName: string | null;
	updatePieceName: (newPieceName: string) => void;
	clearPieceName: () => void;

	commitToDraft: () => void;
};

const usePiecesEditorStore = create<PiecesEditorStore>((set) => ({
	activePiece: null,
	updateActivePiece: (newPiece) => set({ activePiece: newPiece }),
	clearActivePiece: () => set({ activePiece: null }),

	piecesEditorChanges: {},
	addPieceEditorChanges: (changes) =>
		set((state) => ({
			piecesEditorChanges: {
				...state.piecesEditorChanges,
				...changes,
			},
		})),

	removePieceEditorChanges: (changes) => {
		set((state) => {
			const newChanges = structuredClone(state.piecesEditorChanges);
			for (const key of changes) {
				delete newChanges[key];
			}

			return { piecesEditorChanges: newChanges };
		});
	},

	clearPieceEditorChanges: () => set({ piecesEditorChanges: {} }),

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

	pieceName: null,
	updatePieceName: (newPieceName) => set({ pieceName: newPieceName }),
	clearPieceName: () => set({ pieceName: null }),

	commitToDraft: () => {},
}));

export default usePiecesEditorStore;
