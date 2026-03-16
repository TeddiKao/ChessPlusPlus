import { IconChevronLeft } from "@tabler/icons-react";
import VariantSidebar from "@/features/variants/variantEditor/common/components/VariantSidebar";
import { Button } from "@/components/ui/button";

function VariantEditorPage() {
	return (
		<>
			<div className="flex-col gap-2 pt-4 pl-4">
				<div className="flex flex-row gap-2 items-center">
					<Button variant="ghost">
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
