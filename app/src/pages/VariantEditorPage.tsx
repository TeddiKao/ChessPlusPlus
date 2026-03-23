import { IconChevronLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import useVariantsStore from "@/features/variants/common/stores/variantsStore";

function VariantEditorPage() {
	const { variantId } = useParams();
	const { variants } = useVariantsStore();

	if (!variantId) return null;

	const variantName = variants[variantId].variantName;

	return (
		<div className="flex flex-col gap-2">
			<Button variant="ghost" className="flex flex-row gap-2">
				<IconChevronLeft className="size-6" />
				<span>{variantName}</span>
			</Button>
		</div>
	);
}

export default VariantEditorPage;
