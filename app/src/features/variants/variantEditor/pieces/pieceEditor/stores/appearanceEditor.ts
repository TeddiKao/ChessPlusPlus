import { create } from "zustand";

type AppearanceEditorChanges = {
	pieceName: string;
	whitePieceImage: Blob | null;
	blackPieceImage: Blob | null;
};

type AppearanceEditorStore = {
	pieceName: string | null;
	updatePieceName: (newPieceName: string) => void;
	clearPieceName: () => void;

	whitePieceImage: Blob | null;
	updateWhitePieceImage: (newImage: Blob) => void;
	clearWhitePieceImage: () => void;

	blackPieceImage: Blob | null;
	updateBlackPieceImage: (newImage: Blob) => void;
	clearBlackPieceImage: () => void;

	appearanceEditorChanges: Partial<AppearanceEditorChanges>;
	addAppearanceEditorChanges: (
		changes: Partial<AppearanceEditorChanges>,
	) => void;
	removeAppearanceEditorChanges: (
		keys: (keyof AppearanceEditorChanges)[],
	) => void;
	clearAppearanceEditorChanges: () => void;
};

const useAppearanceEditorStore = create<AppearanceEditorStore>((set) => ({
	pieceName: null,
	updatePieceName: (newPieceName) => set({ pieceName: newPieceName }),
	clearPieceName: () => set({ pieceName: null }),

	whitePieceImage: null,
	updateWhitePieceImage: (newImage) => set({ whitePieceImage: newImage }),
	clearWhitePieceImage: () => set({ whitePieceImage: null }),

	blackPieceImage: null,
	updateBlackPieceImage: (newImage) => set({ blackPieceImage: newImage }),
	clearBlackPieceImage: () => set({ blackPieceImage: null }),

	appearanceEditorChanges: {},
	addAppearanceEditorChanges: (changes) =>
		set((state) => ({
			appearanceEditorChanges: {
				...state.appearanceEditorChanges,
				...changes,
			},
		})),

	removeAppearanceEditorChanges: (keys) => {
		set((state) => {
			const newState = structuredClone(state);

			for (const key of keys) {
				delete newState.appearanceEditorChanges[key];
			}

			return newState;
		});
	},

	clearAppearanceEditorChanges: () => set({ appearanceEditorChanges: {} }),
}));

export default useAppearanceEditorStore;
