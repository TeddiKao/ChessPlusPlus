import { create } from "zustand";
import useVariantDraftStore from "@/features/variants/variantEditor/stores/variantDraft";
import type { RegularMove } from "@/features/variants/common/types/pieceRules";

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

	activePieceMovements: {
		white: RegularMove[];
		black: RegularMove[];
	};
	addMovementToActivePiece: (
		color: "white" | "black",
		movementName: string,
	) => void;
	removeMovementFromActivePiece: (
		color: "white" | "black",
		movementToRemove: string,
	) => void;
	clearMovementsFromActivePiece: () => void;

	pieceName: string | null;
	updatePieceName: (newPieceName: string) => void;
	clearPieceName: () => void;

	commitToDraft: (keys?: (keyof PieceEditorChanges)[]) => void;
};

const usePiecesEditorStore = create<PiecesEditorStore>((set, get) => ({
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

	activePieceMovements: { white: [], black: [] },
	addMovementToActivePiece: (color, movementName) =>
		set((state) => ({
			activePieceMovements: {
				...state.activePieceMovements,
				[color]: {
					...state.activePieceMovements[color],
					movementName,
				},
			},
		})),
	removeMovementFromActivePiece: (color, movementToRemove) =>
		set((state) => ({
			activePieceMovements: {
				...state.activePieceMovements,
				[color]: {
					...state.activePieceMovements[color].filter(
						(movementInfo) =>
							movementInfo.moveName !== movementToRemove,
					),
				},
			},
		})),

	clearMovementsFromActivePiece: () => {
		set({ activePieceMovements: { white: [], black: [] } });
	},

	pieceName: null,
	updatePieceName: (newPieceName) => set({ pieceName: newPieceName }),
	clearPieceName: () => set({ pieceName: null }),

	commitToDraft: (keys) => {
		const pieceEditorChanges = get().piecesEditorChanges;
		const pieceRulesetDraft =
			useVariantDraftStore.getState().pieceRulesetDraft;
		const setupRulesDraft = useVariantDraftStore.getState().setupRulesDraft;

		if (!pieceRulesetDraft) return;
		if (!setupRulesDraft) return;

		const updatedPieceRulesetDraft = structuredClone(pieceRulesetDraft);
		const updatedSetupRulesDraft = structuredClone(setupRulesDraft);

		if (!keys) {
			const originalPieceName = get().pieceName;
			if (!originalPieceName) return;

			if (Object.keys(pieceEditorChanges).includes("pieceName")) {
				if (!pieceEditorChanges.pieceName) return;

				const originalWhitePieceRules =
					updatedPieceRulesetDraft[`white_${originalPieceName}`];
				if (!originalWhitePieceRules) return;

				const originalBlackPieceRules =
					updatedPieceRulesetDraft[`white_${originalPieceName}`];
				if (!originalBlackPieceRules) return;

				const nonNameChanges = Object.fromEntries(
					Object.entries(pieceEditorChanges).filter(
						([key]) => key !== "pieceName",
					),
				);

				const newWhitePieceInfo = {
					...originalWhitePieceRules,
					...nonNameChanges,
				};

				const newBlackPieceInfo = {
					...originalBlackPieceRules,
					...nonNameChanges,
				};

				delete updatedPieceRulesetDraft[`white_${originalPieceName}`];
				delete updatedPieceRulesetDraft[`black_${originalPieceName}`];

				updatedPieceRulesetDraft[
					`white_${pieceEditorChanges.pieceName}`
				] = newWhitePieceInfo;
				updatedPieceRulesetDraft[
					`black_${pieceEditorChanges.pieceName}`
				] = newBlackPieceInfo;

				const pieceOwnership = setupRulesDraft.pieceOwnership;
				const startingPosition = setupRulesDraft.startingPosition;

				updatedSetupRulesDraft.pieceOwnership.white =
					pieceOwnership.white.map((pieceName) =>
						pieceName === `white_${originalPieceName}`
							? `white_${pieceEditorChanges.pieceName}`
							: pieceName,
					);

				updatedSetupRulesDraft.pieceOwnership.black =
					pieceOwnership.black.map((pieceName) =>
						pieceName === `black_${originalPieceName}`
							? `black_${pieceEditorChanges.pieceName}`
							: pieceName,
					);

				updatedSetupRulesDraft.startingPosition = startingPosition.map(
					(squareInfo) => {
						if (
							squareInfo.pieceName ===
							`white_${originalPieceName}`
						) {
							return {
								...squareInfo,
								pieceName: `white_${pieceEditorChanges.pieceName}`,
							};
						} else if (
							squareInfo.pieceName ===
							`black_${originalPieceName}`
						) {
							return {
								...squareInfo,
								pieceName: `black_${pieceEditorChanges.pieceName}`,
							};
						} else {
							return squareInfo;
						}
					},
				);

				const updateSetupRulesDraft =
					useVariantDraftStore.getState().updateSetupRulesDraft;
				const updatePieceRulesetDraft =
					useVariantDraftStore.getState().updatePieceRulesetDraft;

				updateSetupRulesDraft(updatedSetupRulesDraft);
				updatePieceRulesetDraft(updatedPieceRulesetDraft);
			}
		}
	},
}));

export default usePiecesEditorStore;
