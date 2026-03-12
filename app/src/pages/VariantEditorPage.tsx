import { IconChevronLeft } from "@tabler/icons-react";

function VariantEditorPage() {
	return (
		<div className="flex-col gap-2 pt-4 pl-4">
			<div className="flex flex-row gap-2">
				<button>
					<IconChevronLeft />
				</button>

				<p>Variant name</p>
			</div>
		</div>
	);
}

export default VariantEditorPage;
