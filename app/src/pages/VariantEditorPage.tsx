import { IconChevronLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import useVariantsStore from "@/features/variants/common/stores/variantsStore";

function VariantEditorPage() {
	const { variantId } = useParams();
	const { variants, hasHydrated } = useVariantsStore();

	const navigate = useNavigate();

	if (!variantId) return null;
	if (!hasHydrated) return null;

	const selectedVariant = variants[variantId];
	if (!selectedVariant) return null;

	const variantName = variants[variantId].variantName;

	function handleNavigationToHomePage() {
		navigate("/");
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-row px-4 py-4 items-center">
				<Button
					onClick={handleNavigationToHomePage}
					size="xs"
					data-icon="inline-start"
					variant="ghost"
				>
					<IconChevronLeft className="size-5" />
				</Button>

				<span>{variantName}</span>
			</div>
		</div>
	);
}

export default VariantEditorPage;
