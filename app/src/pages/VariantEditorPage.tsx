import { IconChevronLeft } from "@tabler/icons-react";
import VariantSidebar from "@/features/variants/variantEditor/common/components/VariantSidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function VariantEditorPage() {
	const navigate = useNavigate();

	return (
		<>
			<div className="flex-col gap-2 pt-4 pl-4">
				<div className="flex flex-row gap-2 items-center">
					<Button onClick={() => navigate("/")} variant="ghost">
						<IconChevronLeft className="size-5" />
					</Button>

					<p>Variant name</p>
				</div>
			</div>

			<VariantSidebar />
		</>
	);
}

export default VariantEditorPage;
