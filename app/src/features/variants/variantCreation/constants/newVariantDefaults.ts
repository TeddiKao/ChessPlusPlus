import type { VariantRules } from "@/features/variants/common/types/variants";
import { defaultPieceRules } from "@/features/variants/variantCreation/constants/pieceRuleDefaults";
import { defaultSetupRules } from "@/features/variants/variantCreation/constants/defaultSetupRules";
import { defaultMovementRules } from "@/features/variants/variantCreation/constants/movementRuleDefaults";

const defaultVariantRules: VariantRules = {
	setupRules: defaultSetupRules,
	piecesRules: defaultPieceRules,
	movementRules: defaultMovementRules,
};

export { defaultVariantRules };
