import { create } from "zustand";
import useVariantsStore from "@/features/variants/common/stores/variantsStore";
import useMovementRulesDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft/movementRulesDraft";
import usePieceRulesDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft/pieceRulesDraft";
import useSetupRulesDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft/setupRulesDraft";

type VariantDraftStore = {
	currentVariantId: string | null;
	updateCurrentVariantId: (newId: string) => void;
	clearCurrentVariantId: () => void;

	syncFullDraftWithDB: () => void;
	syncMovementRulesWithDB: () => void;
	syncPiecesRulesWithDB: () => void;
	syncSetupRulesWithDB: () => void;
};

const useVariantDraftStore = create<VariantDraftStore>((set, get) => ({
	currentVariantId: null,
	updateCurrentVariantId: (newId) => set({ currentVariantId: newId }),
	clearCurrentVariantId: () => set({ currentVariantId: "" }),

	syncFullDraftWithDB: () => {
		const currentVariantId = get().currentVariantId;
		if (!currentVariantId) return;

		const updateVariant = useVariantsStore.getState().updateVariant;
		const originalVariantInfo =
			useVariantsStore.getState().variants[currentVariantId];
		if (!originalVariantInfo) return;

		const movementRulesDraft =
			useMovementRulesDraftStore.getState().movementRules;
		const pieceRulesDraft = usePieceRulesDraftStore.getState().pieces;
		const setupRulesDraft = useSetupRulesDraftStore.getState().setupRules;

		if (!movementRulesDraft) return;
		if (!pieceRulesDraft) return;
		if (!setupRulesDraft) return;

		updateVariant(currentVariantId, {
			...originalVariantInfo,
			variantRules: {
				movementRules: movementRulesDraft,
				piecesRules: pieceRulesDraft,
				setupRules: setupRulesDraft,
			},
		});
	},

	syncMovementRulesWithDB: () => {
		const currentVariantId = get().currentVariantId;
		if (!currentVariantId) return;

		const updateVariant = useVariantsStore.getState().updateVariant;
		const originalVariantInfo =
			useVariantsStore.getState().variants[currentVariantId];
		if (!originalVariantInfo) return;

		const movementRulesDraft =
			useMovementRulesDraftStore.getState().movementRules;

		if (!movementRulesDraft) return;

		updateVariant(currentVariantId, {
			...originalVariantInfo,
			variantRules: {
				...originalVariantInfo.variantRules,
				movementRules: movementRulesDraft,
			},
		});
	},

	syncSetupRulesWithDB: () => {
		const currentVariantId = get().currentVariantId;
		if (!currentVariantId) return;

		const updateVariant = useVariantsStore.getState().updateVariant;
		const originalVariantInfo =
			useVariantsStore.getState().variants[currentVariantId];
		if (!originalVariantInfo) return;

		const setupRulesDraft = useSetupRulesDraftStore.getState().setupRules;

		if (!setupRulesDraft) return;

		updateVariant(currentVariantId, {
			...originalVariantInfo,
			variantRules: {
				...originalVariantInfo.variantRules,
				setupRules: setupRulesDraft,
			},
		});
	},

	syncPiecesRulesWithDB: () => {
		const currentVariantId = get().currentVariantId;
		if (!currentVariantId) return;

		const updateVariant = useVariantsStore.getState().updateVariant;
		const originalVariantInfo =
			useVariantsStore.getState().variants[currentVariantId];
		if (!originalVariantInfo) return;

		const piecesRulesDraft = usePieceRulesDraftStore.getState().pieces;
		if (!piecesRulesDraft) return;

		updateVariant(currentVariantId, {
			...originalVariantInfo,
			variantRules: {
				...originalVariantInfo.variantRules,
				piecesRules: piecesRulesDraft,
			},
		});
	},
}));

export default useVariantDraftStore;
