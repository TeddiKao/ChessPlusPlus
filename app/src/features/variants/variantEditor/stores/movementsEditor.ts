import { create } from "zustand";
import useVariantDraftStore from "@/features/variants/variantEditor/stores/variantDraft";
import type { MoveDefinitionChanges } from "@/features/variants/common/types/movementRules";

type MovementsEditorChanges = {
	movementName: string;
	forMovement: boolean;
	forCapture: boolean;
	offsetX: number;
	offsetY: number;
	range: number;
};

type MovementsEditorStore = {
	activeMovementName: string | null;
	updateActiveMovementName: (newMovementName: string) => void;
	clearActiveMovementName: () => void;

	movementName: string | null;
	updateMovementName: (newMovementName: string) => void;
	clearMovementName: () => void;

	movementsEditorChanges: Partial<MovementsEditorChanges>;
	addMovementsEditorChanges: (
		changes: Partial<MovementsEditorChanges>,
	) => void;
	removeMovementsEditorChanges: (
		changeKeys: (keyof MovementsEditorChanges)[],
	) => void;
	clearMovementsEditorChanges: () => void;

	forMovement: boolean | null;
	toggleForMovement: () => void;
	clearForMovement: () => void;

	forCapture: boolean | null;
	toggleForCapture: () => void;
	clearForCapture: () => void;

	offsetX: number | null;
	updateOffsetX: (newOffset: number) => void;
	clearOffsetX: () => void;

	offsetY: number | null;
	updateOffsetY: (newOffset: number) => void;
	clearOffsetY: () => void;

	range: number | "inf" | null;
	updateRange: (newRange: number | "inf") => void;
	clearRange: () => void;

	commitToDraft: (keys?: (keyof MovementsEditorChanges)[]) => void;
};

const useMovementsEditorStore = create<MovementsEditorStore>((set, get) => ({
	activeMovementName: null,
	updateActiveMovementName: (newMovementName) =>
		set({ activeMovementName: newMovementName }),
	clearActiveMovementName: () => set({ activeMovementName: null }),

	movementName: null,
	updateMovementName: (newMovementName) =>
		set({ movementName: newMovementName }),
	clearMovementName: () => set({ movementName: null }),

	movementsEditorChanges: {},
	addMovementsEditorChanges: (changes) =>
		set((state) => ({
			movementsEditorChanges: {
				...state.movementsEditorChanges,
				...changes,
			},
		})),

	removeMovementsEditorChanges: (changeKeys) => {
		set((state) => {
			const newChanges = structuredClone(state.movementsEditorChanges);

			for (const key of changeKeys) {
				delete newChanges[key];
			}

			return { movementsEditorChanges: newChanges };
		});
	},

	clearMovementsEditorChanges: () => set({ movementsEditorChanges: {} }),

	forMovement: null,
	toggleForMovement: () =>
		set((state) => ({ forMovement: !state.forMovement })),
	clearForMovement: () => set({ forMovement: null }),

	forCapture: null,
	toggleForCapture: () => set((state) => ({ forCapture: !state.forCapture })),
	clearForCapture: () => set({ forCapture: null }),

	offsetX: null,
	updateOffsetX: (newOffset) => set({ offsetX: newOffset }),
	clearOffsetX: () => set({ offsetX: null }),

	offsetY: null,
	updateOffsetY: (newOffset) => set({ offsetY: newOffset }),
	clearOffsetY: () => set({ offsetY: null }),

	range: null,
	updateRange: (newRange) => set({ range: newRange }),
	clearRange: () => set({ range: null }),

	commitToDraft: (keys) => {
		const movementEditorChanges = get().movementsEditorChanges;
		const movementRulesDraft =
			useVariantDraftStore.getState().movementRulesDraft;
		const pieceRulesetDraft =
			useVariantDraftStore.getState().pieceRulesetDraft;

		if (!movementRulesDraft) return;
		if (!pieceRulesetDraft) return;

		const updatedMovementRulesDraft = structuredClone(movementRulesDraft);
		const updatedPieceRulesetDraft = structuredClone(pieceRulesetDraft);

		const originalMovementName = get().movementName;
		if (!originalMovementName) return;

		const originalMovementInfo = movementRulesDraft[originalMovementName];
		if (!originalMovementInfo) return;

		const moveDefinitionChangeKeys: (keyof MoveDefinitionChanges)[] = [
			"moveStopConditions",
			"offsetY",
			"offsetX",
			"range",
		];

		if (!keys) {
			const nonNameChanges = Object.fromEntries(
				Object.entries(movementEditorChanges).filter(
					([key]) => key !== "movementName",
				),
			);

			const topLevelChanges = Object.fromEntries(
				Object.entries(nonNameChanges).filter(
					([key]) =>
						!moveDefinitionChangeKeys.includes(
							key as keyof MoveDefinitionChanges,
						),
				),
			);

			const moveDefinitionChanges = Object.fromEntries(
				Object.entries(nonNameChanges).filter(([key]) =>
					moveDefinitionChangeKeys.includes(
						key as keyof MoveDefinitionChanges,
					),
				),
			);

			const newMovementInfo = {
				...originalMovementInfo,
				...topLevelChanges,

				moveDefinition: {
					...originalMovementInfo.moveDefinition,
					...moveDefinitionChanges,
				},
			};

			if (Object.keys(movementEditorChanges).includes("movementName")) {
				if (!movementEditorChanges.movementName) return;

				delete updatedMovementRulesDraft[originalMovementName];
				updatedMovementRulesDraft[movementEditorChanges.movementName] =
					newMovementInfo;

				for (const [pieceName] of Object.entries(pieceRulesetDraft)) {
					updatedPieceRulesetDraft[pieceName].moveset.map((move) => {
						if (Array.isArray(move)) {
							return move.map((chainedMove) => {
								if (
									chainedMove.moveName !==
									originalMovementName
								)
									return chainedMove;

								return {
									...move,
									moveName:
										movementEditorChanges.movementName,
								};
							});
						}

						if (move.moveName === originalMovementName) {
							return {
								...move,
								moveName: movementEditorChanges.movementName,
							};
						}
					});
				}
			}
		} else {
			const changesToCommit = Object.fromEntries(
				Object.entries(movementEditorChanges).filter(([key]) =>
					keys.includes(key as keyof MovementsEditorChanges),
				),
			);

			const nonNameChanges = Object.fromEntries(
				Object.entries(changesToCommit).filter(
					([key]) => key !== "movementName",
				),
			);

			const topLevelChanges = Object.fromEntries(
				Object.entries(nonNameChanges).filter(
					([key]) =>
						!moveDefinitionChangeKeys.includes(
							key as keyof MoveDefinitionChanges,
						),
				),
			);

			const moveDefinitionChanges = Object.fromEntries(
				Object.entries(nonNameChanges).filter(([key]) =>
					moveDefinitionChangeKeys.includes(
						key as keyof MoveDefinitionChanges,
					),
				),
			);

			const renamedMoveDefinitionChanges = Object.fromEntries(
				Object.entries(moveDefinitionChanges).map(([key, value]) => {
					if (key === "offsetX") {
						return ["moveX", value];
					}

					if (key === "offsetY") {
						return ["moveY", value];
					}

					return [key, value];
				}),
			);

			const newMovementInfo = {
				...originalMovementInfo,
				...topLevelChanges,

				moveDefinition: {
					...originalMovementInfo.moveDefinition,
					...renamedMoveDefinitionChanges,
				},
			};

			if (Object.keys(movementEditorChanges).includes("movementName")) {
				if (!movementEditorChanges.movementName) return;

				delete updatedMovementRulesDraft[originalMovementName];
				updatedMovementRulesDraft[movementEditorChanges.movementName] =
					newMovementInfo;

				for (const [pieceName] of Object.entries(pieceRulesetDraft)) {
					updatedPieceRulesetDraft[pieceName].moveset.map((move) => {
						if (Array.isArray(move)) {
							return move.map((chainedMove) => {
								if (
									chainedMove.moveName !==
									originalMovementName
								)
									return chainedMove;

								return {
									...move,
									moveName:
										movementEditorChanges.movementName,
								};
							});
						}

						if (move.moveName === originalMovementName) {
							return {
								...move,
								moveName: movementEditorChanges.movementName,
							};
						}
					});
				}
			}
		}
	},
}));

export default useMovementsEditorStore;
