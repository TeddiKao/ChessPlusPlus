import type { SetupRules } from "@/features/variants/common/types/setupRules";
import type { PieceRuleset } from "@/features/variants/common/types/pieceRules";
import type {
	MovementRules,
} from "@/features/variants/common/types/movementRules";
import { create } from "zustand";

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
};

const useVariantDraftStore = create<VariantDraftStore>((set) => ({
	currentVariantId: null,
	updateCurrentVariantId: (newVariantId) =>
		set({ currentVariantId: newVariantId }),
	clearCurrentVariantId: () => set({ currentVariantId: null }),

	setupRulesDraft: null,
	updateSetupRulesDraft: (newDraft) => set({ setupRulesDraft: newDraft }),
	clearSetupRulesDraft: () => set({ setupRulesDraft: null }),

	pieceRulesetDraft: null,
	updatePieceRulesetDraft: (newDraft) => set({ pieceRulesetDraft: newDraft }),
	clearPieceRulesDraft: () => set({ setupRulesDraft: null }),

	movementRulesDraft: null,
	updateMovementRulesDraft: (newDraft) =>
		set({ movementRulesDraft: newDraft }),
	clearMovementRulesDraft: () => set({ setupRulesDraft: null }),
}));

export default useVariantDraftStore;