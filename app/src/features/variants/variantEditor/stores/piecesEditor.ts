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

	isMovementsExpanded: boolean;
	toggleMovementsExpanded: () => void;

	piecesEditorChanges: Partial<PieceEditorChanges>;
	addPieceEditorChanges: (changes: Partial<PieceEditorChanges>) => void;
	removePieceEditorChanges: (
		changeKeys: (keyof PieceEditorChanges)[],
	) => void;
	clearPieceEditorChanges: () => void;

	activePieceMovements: RegularMove[];
	addMovementToActivePiece: (movement: RegularMove) => void;
	removeMovementFromActivePiece: (movementName: string) => void;
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

	isMovementsExpanded: false,
	toggleMovementsExpanded: () => set((state) => ({ isMovementsExpanded: !state.isMovementsExpanded })),

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
	addMovementToActivePiece: (movement) =>
		set((state) => ({
			activePieceMovements: [...state.activePieceMovements, movement],
		})),
	removeMovementFromActivePiece: (movementName) =>
		set((state) => ({
			activePieceMovements: state.activePieceMovements.filter(
				(movement) => movement.moveName !== movementName,
			),
		})),
	clearMovementsFromActivePiece: () => set({ activePieceMovements: [] }),

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

		const originalPieceRules = updatedPieceRulesetDraft[originalPieceName];
		if (!originalPieceRules) return;

		if (!keys) {
			const nonNameChanges = Object.fromEntries(
				Object.entries(pieceEditorChanges).filter(
					([key]) => key !== "pieceName",
				),
			);

			const newPieceInfo = {
				...originalPieceRules,
				...nonNameChanges,
			};

			updatedPieceRulesetDraft[originalPieceName] = newPieceInfo;

			if (Object.keys(pieceEditorChanges).includes("pieceName")) {
				if (!pieceEditorChanges.pieceName) return;

				handlePieceNameUpdate(
					originalPieceName,
					updatedPieceRulesetDraft,
					updatedSetupRulesDraft,
					newPieceInfo,
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

			const newPieceInfo = {
				...originalPieceRules,
				...nonNameChanges,
			};

			if (Object.keys(pieceEditorChanges).includes("pieceName")) {
				if (!pieceEditorChanges.pieceName) return;

				handlePieceNameUpdate(
					originalPieceName,
					updatedPieceRulesetDraft,
					updatedSetupRulesDraft,
					newPieceInfo,
					pieceEditorChanges.pieceName,
				);
			}

			get().removePieceEditorChanges(keys);
		}

		const updateSetupRulesDraft =
			useVariantDraftStore.getState().updateSetupRulesDraft;
		const updatePieceRulesetDraft =
			useVariantDraftStore.getState().updatePieceRulesetDraft;

		updateSetupRulesDraft(setupRulesDraft);
		updatePieceRulesetDraft(pieceRulesetDraft);
	},
}));

export default usePiecesEditorStore;
