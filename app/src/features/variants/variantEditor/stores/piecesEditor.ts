import { create } from "zustand";
import useVariantDraftStore from "@/features/variants/variantEditor/stores/variantDraft";
import type { RegularMove } from "@/features/variants/common/types/pieceRules";
import { handlePieceNameUpdate } from "@/features/variants/variantEditor/utils/nameUpdateHandler";

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

		const originalPieceName = get().pieceName;
		if (!originalPieceName) return;

		const originalWhitePieceRules =
			updatedPieceRulesetDraft[`white_${originalPieceName}`];
		if (!originalWhitePieceRules) return;

		const originalBlackPieceRules =
			updatedPieceRulesetDraft[`black_${originalPieceName}`];
		if (!originalBlackPieceRules) return;

		if (!keys) {
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

			updatedPieceRulesetDraft[`white_${originalPieceName}`] =
				newWhitePieceInfo;
			updatedPieceRulesetDraft[`black_${originalPieceName}`] =
				newBlackPieceInfo;

			if (Object.keys(pieceEditorChanges).includes("pieceName")) {
				if (!pieceEditorChanges.pieceName) return;

				handlePieceNameUpdate(
					originalPieceName,
					updatedPieceRulesetDraft,
					updatedSetupRulesDraft,
					newWhitePieceInfo,
					newBlackPieceInfo,
					pieceEditorChanges.pieceName,
				);
			}

			get().clearPieceEditorChanges();
		} else {
			const changesToCommit = Object.fromEntries(
				Object.entries(pieceEditorChanges).filter(([key]) =>
					keys.includes(key as keyof PieceEditorChanges),
				),
			);

			const nonNameChanges = Object.fromEntries(
				Object.entries(changesToCommit).filter(
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

			if (Object.keys(pieceEditorChanges).includes("pieceName")) {
				if (!pieceEditorChanges.pieceName) return;

				handlePieceNameUpdate(
					originalPieceName,
					updatedPieceRulesetDraft,
					updatedSetupRulesDraft,
					newWhitePieceInfo,
					newBlackPieceInfo,
					pieceEditorChanges.pieceName,
				);
			}

			const updateSetupRulesDraft =
				useVariantDraftStore.getState().updateSetupRulesDraft;
			const updatePieceRulesetDraft =
				useVariantDraftStore.getState().updatePieceRulesetDraft;

			updateSetupRulesDraft(setupRulesDraft);
			updatePieceRulesetDraft(pieceRulesetDraft);

			get().removePieceEditorChanges(keys);
		}
	},
}));

export default usePiecesEditorStore;
