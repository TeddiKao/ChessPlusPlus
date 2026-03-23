import type { SetupRules } from "@/features/variants/common/types/setupRules";
import type { PieceRuleset } from "@/features/variants/common/types/pieceRules";

type VariantRules = {
	setupRules: SetupRules;
	piecesRules: PieceRuleset;
};

type VariantInfo = {
	variantRules: VariantRules;
	variantName: string;
};

export type { VariantInfo, VariantRules };
