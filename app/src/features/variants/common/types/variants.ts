import type { SetupRules } from "@/features/variants/common/types/setupRules";
import type { PiecesRules } from "@/features/variants/common/types/pieceRules";
import type { MovementRules } from "@/features/variants/common/types/movementRules";

type VariantRules = {
	setupRules: SetupRules;
	piecesRules: PiecesRules;
	movementRules: MovementRules;
};

type VariantInfo = {
	variantRules: VariantRules;
	variantName: string;
};

export type { VariantInfo, VariantRules };
