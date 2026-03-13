import { IconChevronLeft } from "@tabler/icons-react";
import VariantSidebar from "@/features/variants/variantEditor/VariantSidebar";

function VariantEditorPage() {
	return (
		<>
			<div className="flex-col gap-2 pt-4 pl-4">
				<div className="flex flex-row gap-2">
					<button>
						<IconChevronLeft />
					</button>

					<p>Variant name</p>
				</div>
			</div>

			<VariantSidebar />
		</>
	);
}

export default VariantEditorPage;
