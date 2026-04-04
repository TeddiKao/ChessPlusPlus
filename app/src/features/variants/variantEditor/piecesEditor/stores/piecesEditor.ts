import { create } from "zustand";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import type {
	ChainedMoveNode,
	ChainedMoveSequence,
	RegularMove,
} from "@/features/variants/common/types/pieceRules";
import { handlePieceNameUpdate } from "@/features/variants/variantEditor/common/utils/nameUpdateHandler";

type PieceEditorChanges = {
	pieceName: string;
	activePieceMovements: string[];
};

type PiecesEditorStore = {
	activePiece: string | null;
	updateActivePiece: (newActivePiece: string) => void;
	clearActivePiece: () => void;

	currentTab: "appearance" | "movements";
	updateCurrentTab: (newCurrentTab: "appearance" | "movements") => void;

	isMovementsExpanded: boolean;
	expandMovements: () => void;
	collapseMovements: () => void;

	piecesEditorChanges: Partial<PieceEditorChanges>;
	addPieceEditorChanges: (changes: Partial<PieceEditorChanges>) => void;
	removePieceEditorChanges: (
		changeKeys: (keyof PieceEditorChanges)[],
	) => void;
	clearPieceEditorChanges: () => void;

	activePieceMovements: RegularMove[];
	addMovementToActivePiece: (movement: RegularMove) => void;
	removeMovementFromActivePiece: (movementName: string) => void;
	updateMovementsInActivePiece: (movements: RegularMove[]) => void;
	clearMovementsFromActivePiece: () => void;

	chainedMoveSequences: ChainedMoveSequence[];
	addChainedMoveSequence: (sequence: ChainedMoveSequence) => void;
	removeChainedMoveSequence: (sequenceIndex: number) => void;
	updateChainedMoveSequence: (
		sequenceIndex: number,
		newSequence: ChainedMoveSequence,
	) => void;
	clearChainedMoveSequences: () => void;

	addChainedMoveToSequence: (
		sequenceIndex: number,
		insertPos: number,
		move: ChainedMoveNode,
	) => void;
	removeChainedMoveFromSequence: (
		sequenceIndex: number,
		moveIndex: number,
	) => void;
	replaceChainedMoveInSequence: (
		sequenceIndex: number,
		moveIndex: number,
		newMove: ChainedMoveNode,
	) => void;

	pieceName: string | null;
	updatePieceName: (newPieceName: string) => void;
	clearPieceName: () => void;

	pieceImageId: string | null;
	updatePieceImageId: (newPieceImageId: string) => void;
	clearPieceImageId: () => void;

	commitToDraft: (keys?: (keyof PieceEditorChanges)[]) => void;
};

const usePiecesEditorStore = create<PiecesEditorStore>((set, get) => ({
	activePiece: null,
	updateActivePiece: (newPiece) => set({ activePiece: newPiece }),
	clearActivePiece: () => set({ activePiece: null }),

	currentTab: "appearance",
	updateCurrentTab: (newCurrentTab) => set({ currentTab: newCurrentTab }),

	isMovementsExpanded: false,
	expandMovements: () => set({ isMovementsExpanded: true }),
	collapseMovements: () => set({ isMovementsExpanded: false }),

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
	updateMovementsInActivePiece: (movements) =>
		set({ activePieceMovements: movements }),
	clearMovementsFromActivePiece: () => set({ activePieceMovements: [] }),

	chainedMoveSequences: [],
	addChainedMoveSequence: (sequence) =>
		set({
			chainedMoveSequences: [...get().chainedMoveSequences, sequence],
		}),

	removeChainedMoveSequence: (sequenceIndex) =>
		set({
			chainedMoveSequences: get().chainedMoveSequences.filter(
				(_, index) => index !== sequenceIndex,
			),
		}),

	updateChainedMoveSequence: (sequenceIndex, newSequence) =>
		set({
			chainedMoveSequences: get().chainedMoveSequences.map(
				(sequence, index) =>
					index === sequenceIndex ? newSequence : sequence,
			),
		}),

	clearChainedMoveSequences: () => set({ chainedMoveSequences: [] }),

	addChainedMoveToSequence: (sequenceIndex, insertPos, move) =>
		set({
			chainedMoveSequences: get().chainedMoveSequences.map(
				(sequence, index) =>
					index === sequenceIndex
						? [
								...sequence.slice(0, insertPos),
								move,
								...sequence.slice(insertPos),
							]
						: sequence,
			),
		}),
	removeChainedMoveFromSequence: (sequenceIndex, moveIndex) =>
		set({
			chainedMoveSequences: get().chainedMoveSequences.map(
				(sequence, index) =>
					index === sequenceIndex
						? sequence.filter((_, index) => index !== moveIndex)
						: sequence,
			),
		}),
	replaceChainedMoveInSequence: (sequenceIndex, moveIndex, newMove) =>
		set({
			chainedMoveSequences: get().chainedMoveSequences.map(
				(sequence, index) =>
					index === sequenceIndex
						? sequence.map((move, index) =>
								index === moveIndex ? newMove : move,
							)
						: sequence,
			),
		}),

	pieceImageId: null,
	updatePieceImageId: (newPieceImageId) =>
		set({ pieceImageId: newPieceImageId }),
	clearPieceImageId: () => set({ pieceImageId: null }),

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

		const originalPieceName = get().activePiece;
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

		updateSetupRulesDraft(updatedSetupRulesDraft);
		updatePieceRulesetDraft(updatedPieceRulesetDraft);
	},
}));

export default usePiecesEditorStore;
