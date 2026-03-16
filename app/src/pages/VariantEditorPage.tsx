import { IconChevronLeft } from "@tabler/icons-react";
import VariantSidebar from "@/features/variants/variantEditor/common/components/VariantSidebar";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import useVariantsStore from "@/features/variants/common/stores/variantsStore";

function VariantEditorPage() {
	const navigate = useNavigate();

	const { variants } = useVariantsStore();
	const { variantId } = useParams<{ variantId: string }>();

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
