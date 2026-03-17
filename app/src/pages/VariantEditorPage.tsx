import { IconChevronLeft } from "@tabler/icons-react";
import VariantSidebar from "@/features/variants/variantEditor/common/components/VariantSidebar";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import useVariantsStore from "@/features/variants/common/stores/variantsStore";
import { useEffect, useRef } from "react";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft/variantDraft";
import useSetupRulesDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft/setupRulesDraft";
import usePieceRulesDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft/pieceRulesDraft";
import useMovementRulesDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft/movementRulesDraft";

function VariantEditorPage() {
	const navigate = useNavigate();

	const { variants } = useVariantsStore();

	const { updateCurrentVariantId, clearCurrentVariantId } =
		useVariantDraftStore();
	const { updateSetupRules } = useSetupRulesDraftStore();
	const { updatePieceRules } = usePieceRulesDraftStore();
	const { updateMovementRules } = useMovementRulesDraftStore();

	const { variantId } = useParams<{ variantId: string }>();

	const initialisedVariantIdRef = useRef<string | null>(null);

	useEffect(() => {
		if (!variantId) {
			navigate("/");
			return;
		}

		if (!variants[variantId]) {
			navigate("/");
			return;
		}

		if (initialisedVariantIdRef.current !== variantId) {
			updateCurrentVariantId(variantId);

			updateSetupRules(variants[variantId].variantRules.setupRules);
			updatePieceRules(variants[variantId].variantRules.piecesRules);
			updateMovementRules(variants[variantId].variantRules.movementRules);

			initialisedVariantIdRef.current = variantId;
		}

		return () => {
			initialisedVariantIdRef.current = null;
			clearCurrentVariantId();
		};
	}, [
		variants,
		variantId,
		navigate,
		updateCurrentVariantId,
		clearCurrentVariantId,
		updateSetupRules,
		updatePieceRules,
		updateMovementRules,
	]);

	if (!variantId) return null;

	const variantName = variants[variantId]?.variantName ?? "";

	return (
		<>
			<div className="flex-col gap-2 pt-4 pl-4">
				<div className="flex flex-row gap-2 items-center">
					<Button
						aria-label="Back to home page"
						onClick={() => navigate("/")}
						variant="ghost"
					>
						<IconChevronLeft className="size-5" />
					</Button>

					<p>{variantName}</p>
				</div>
			</div>

			<VariantSidebar />
		</>
	);
}

export default VariantEditorPage;
