import type { SetupRules } from "@/features/variants/common/types/setupRules";
import type { PieceRuleset } from "@/features/variants/common/types/pieceRules";
import type { MovementRules } from "@/features/variants/common/types/movementRules";
import { create } from "zustand";
import useVariantsStore from "@/features/variants/common/stores/variantsStore";

type VariantDraftStore = {
	currentVariantId: string | null;
	updateCurrentVariantId: (newVariantId: string) => void;
	clearCurrentVariantId: () => void;

	setupRulesDraft: SetupRules | null;
	updateSetupRulesDraft: (newDraft: SetupRules) => void;
	clearSetupRulesDraft: () => void;

	pieceRulesetDraft: PieceRuleset | null;
	updatePieceRulesetDraft: (newDraft: PieceRuleset) => void;
	clearPieceRulesDraft: () => void;

	movementRulesDraft: MovementRules | null;
	updateMovementRulesDraft: (newDraft: MovementRules) => void;
	clearMovementRulesDraft: () => void;

	syncFulLDraftToDB: () => void;
	syncSetupRulesDraftToDB: () => void;
	syncPieceRulesetDraftToDB: () => void;
	syncMovementRulesDraftToDB: () => void;
};

const useVariantDraftStore = create<VariantDraftStore>((set, get) => ({
	currentVariantId: null,
	updateCurrentVariantId: (newVariantId) =>
		set({ currentVariantId: newVariantId }),
	clearCurrentVariantId: () => set({ currentVariantId: null }),

	setupRulesDraft: null,
	updateSetupRulesDraft: (newDraft) => set({ setupRulesDraft: newDraft }),
	clearSetupRulesDraft: () => set({ setupRulesDraft: null }),

	pieceRulesetDraft: null,
	updatePieceRulesetDraft: (newDraft) => set({ pieceRulesetDraft: newDraft }),
	clearPieceRulesDraft: () => set({ pieceRulesetDraft: null }),

	movementRulesDraft: null,
	updateMovementRulesDraft: (newDraft) =>
		set({ movementRulesDraft: newDraft }),
	clearMovementRulesDraft: () => set({ movementRulesDraft: null }),

	syncFulLDraftToDB: () => {
		const currentVariantId = get().currentVariantId;
		if (!currentVariantId) return;

		const setupRulesDraft = get().setupRulesDraft;
		if (!setupRulesDraft) return;

		const pieceRulesetDraft = get().pieceRulesetDraft;
		if (!pieceRulesetDraft) return;

		const movementRulesDraft = get().movementRulesDraft;
		if (!movementRulesDraft) return;

		const originalVariantInfo =
			useVariantsStore.getState().variants[currentVariantId];
		if (!originalVariantInfo) return;

		const updateVariant = useVariantsStore.getState().updateVariant;

		updateVariant(currentVariantId, {
			...originalVariantInfo,
			variantRules: {
				setupRules: setupRulesDraft,
				pieceRuleset: pieceRulesetDraft,
				movementRules: movementRulesDraft,
			},
		});
	},

	syncSetupRulesDraftToDB: () => {
		const currentVariantId = get().currentVariantId;
		if (!currentVariantId) return;

		const setupRulesDraft = get().setupRulesDraft;
		if (!setupRulesDraft) return;

		const originalVariantInfo =
			useVariantsStore.getState().variants[currentVariantId];
		if (!originalVariantInfo) return;

		const updateVariant = useVariantsStore.getState().updateVariant;

		updateVariant(currentVariantId, {
			...originalVariantInfo,
			variantRules: {
				...originalVariantInfo.variantRules,
				setupRules: setupRulesDraft,
			},
		});
	},

	syncPieceRulesetDraftToDB: () => {
		const currentVariantId = get().currentVariantId;
		if (!currentVariantId) return;

		const pieceRulesetDraft = get().pieceRulesetDraft;
		if (!pieceRulesetDraft) return;

		const originalVariantInfo =
			useVariantsStore.getState().variants[currentVariantId];
		if (!originalVariantInfo) return;

		const updateVariant = useVariantsStore.getState().updateVariant;

		updateVariant(currentVariantId, {
			...originalVariantInfo,
			variantRules: {
				...originalVariantInfo.variantRules,
				pieceRuleset: pieceRulesetDraft,
			},
		});
	},

	syncMovementRulesDraftToDB: () => {
		const currentVariantId = get().currentVariantId;
		if (!currentVariantId) return;

		const movementRulesDraft = get().movementRulesDraft;
		if (!movementRulesDraft) return;

		const originalVariantInfo =
			useVariantsStore.getState().variants[currentVariantId];
		const updateVariant = useVariantsStore.getState().updateVariant;

		updateVariant(currentVariantId, {
			...originalVariantInfo,
			variantRules: {
				...originalVariantInfo.variantRules,
				movementRules: movementRulesDraft,
			},
		});
	},
}));

export default useVariantDraftStore;
