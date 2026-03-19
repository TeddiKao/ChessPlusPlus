import { create } from "zustand";
import usePieceRulesDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft/pieceRulesDraft";
import usePieceEditorStore from "@/features/variants/variantEditor/pieces/pieceEditor/stores/pieceEditor";

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

	commitToDraft: (keys?: (keyof AppearanceEditorChanges)[]) => void;
};

const useAppearanceEditorStore = create<AppearanceEditorStore>((set, get) => ({
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

	commitToDraft: (keys) => {
		const updatePieceRules =
			usePieceRulesDraftStore.getState().updatePieceRules;
		const originalPieceRules = usePieceRulesDraftStore.getState().pieces;
		const currentPiece = usePieceEditorStore.getState().currentPiece;

		if (!originalPieceRules) return;
		if (!currentPiece) return;

		const updatedPieceRules = structuredClone(originalPieceRules);
		const appearanceEditorChanges = get().appearanceEditorChanges;
		if (!appearanceEditorChanges) return;

		if (!keys) {
			const nonNameChanges = Object.fromEntries(
				Object.entries(appearanceEditorChanges).filter(
					([key]) => key !== "pieceName",
				),
			);

			updatedPieceRules[currentPiece] = {
				...updatedPieceRules[currentPiece],
				...nonNameChanges,
			};

			if (Object.keys(appearanceEditorChanges).includes("pieceName")) {
				const newPieceName = appearanceEditorChanges.pieceName;
				if (!newPieceName) return;

				delete updatedPieceRules[currentPiece];
				updatedPieceRules[newPieceName] =
					originalPieceRules[currentPiece];
			}

			updatePieceRules(updatedPieceRules);
		} else {
			const changesToCommit = Object.fromEntries(
				Object.entries(appearanceEditorChanges).filter(([key]) =>
					keys.includes(key as keyof AppearanceEditorChanges),
				),
			);

			const nonNameChanges = Object.fromEntries(
				Object.entries(changesToCommit).filter(
					([key]) => key !== "pieceName",
				),
			);

			updatedPieceRules[currentPiece] = {
				...updatedPieceRules[currentPiece],
				...nonNameChanges,
			};

			if (Object.keys(changesToCommit).includes("pieceName")) {
				const newPieceName = appearanceEditorChanges.pieceName;
				if (!newPieceName) return;

				delete updatedPieceRules[currentPiece];
				updatedPieceRules[newPieceName] =
					originalPieceRules[currentPiece];
			}

			updatePieceRules(updatedPieceRules);
		}
	},
}));

export default useAppearanceEditorStore;
