import { IconChevronLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import useVariantsStore from "@/features/variants/common/stores/variantsStore";
import Sidebar from "@/features/variants/variantEditor/common/components/Sidebar";
import { useEffect } from "react";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import ChessboardGrid from "@/features/variants/variantEditor/common/components/ChessboardGrid";
import useSidebarStore from "@/features/variants/variantEditor/common/stores/sidebar";
import clsx from "clsx";

function VariantEditorPage() {
	const { variantId } = useParams();
	const { variants, hasHydrated } = useVariantsStore();
	const {
		updateCurrentVariantId,
		updateSetupRulesDraft,
		updateMovementRulesDraft,
		updatePieceRulesetDraft,
	} = useVariantDraftStore();

	const navigate = useNavigate();

	useEffect(() => {
		if (!variantId) return;

		const selectedVariant = variants[variantId];
		if (!selectedVariant) return;

		updateCurrentVariantId(variantId);
		updateSetupRulesDraft(selectedVariant.variantRules.setupRules);
		updateMovementRulesDraft(selectedVariant.variantRules.movementRules);
		updatePieceRulesetDraft(selectedVariant.variantRules.pieceRuleset);
	}, [
		updateCurrentVariantId,
		updateMovementRulesDraft,
		updatePieceRulesetDraft,
		updateSetupRulesDraft,
		variantId,
		variants,
	]);

	const { currentOpenMenu } = useSidebarStore();

	if (!variantId) return null;
	if (!hasHydrated) return null;

	const selectedVariant = variants[variantId];
	if (!selectedVariant) return null;

	const variantName = variants[variantId].variantName;

	function handleNavigationToHomePage() {
		navigate("/");
	}

	return (
		<div className="relative min-h-screen">
			<div className="flex flex-col gap-6">
				<div className="flex flex-row gap-2 px-4 py-4 items-center p-12">
					<Button
						onClick={handleNavigationToHomePage}
						size="xs"
						className="p-0"
						data-icon="inline-start"
						variant="ghost"
						aria-label="Back to home page"
					>
						<IconChevronLeft className="size-5" />
					</Button>

					<span>{variantName}</span>
				</div>

				<div
					className={clsx(
						"flex flex-row justify-center",
						currentOpenMenu === "movements" ||
							currentOpenMenu === "pieces"
							? "-ml-28"
							: "",
					)}
				>
					<div className="aspect-square flex flex-row justify-center w-full max-w-md">
						<ChessboardGrid />
					</div>
				</div>
			</div>

			<Sidebar />
		</div>
	);
}

export default VariantEditorPage;
