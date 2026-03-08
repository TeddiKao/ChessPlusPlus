import type { VariantRules } from "@/features/variants/common/types/variants";
import { defaultPieceRules } from "@/features/variants/variantCreation/constants/pieceRuleDefaults";
import { defaultSetupRules } from "@/features/variants/variantCreation/constants/defaultSetupRules";

const defaultVariantRules: VariantRules = {
	setupRules: defaultSetupRules,
	piecesRules: defaultPieceRules,
};

export { defaultVariantRules };
