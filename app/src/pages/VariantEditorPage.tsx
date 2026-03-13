import { IconChevronLeft } from "@tabler/icons-react";
import { ChessKnight, Grid2X2 } from "lucide-react";

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
				<button type="button">
					<Grid2X2 strokeWidth={1.5} />
				</button>
				<button type="button">
					<ChessKnight strokeWidth={1.5} />
				</button>
			</div>
		</>
	);
}

export default VariantEditorPage;
