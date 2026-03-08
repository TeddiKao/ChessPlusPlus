import type { SetupRules } from "@/features/variants/common/types/setupRules";
import type { PiecesRules } from "@/features/variants/common/types/pieceRules";

type VariantRules = {
	setupRules: SetupRules;
	piecesRules: PiecesRules;
};

type VariantInfo = {
	variantRules: VariantRules;
	variantName: string;
};

export type { VariantInfo, VariantRules };
