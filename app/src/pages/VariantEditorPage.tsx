import { IconChevronLeft } from "@tabler/icons-react";
import { ChessboardSettingsButton } from "@/features/variants/variantEditor/components/ChessboardSettingsButton";
import { PiecesButton } from "@/features/variants/variantEditor/components/PiecesButton";

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

			<div className="absolute top-0 right-0 flex flex-col gap-4 p-4 h-screen bg-sidebar-primary-foreground">
				<ChessboardSettingsButton />
				<PiecesButton />
			</div>
		</>
	);
}

export default VariantEditorPage;
