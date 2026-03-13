import { IconChevronLeft } from "@tabler/icons-react";
import { ChessKnight, Grid2X2 } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

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
				<Tooltip>
					<TooltipTrigger asChild>
						<button type="button">
							<Grid2X2 strokeWidth={1.5} />
						</button>
					</TooltipTrigger>

					<TooltipContent side="left">Board settings</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<button type="button">
							<ChessKnight strokeWidth={1.5} />
						</button>
					</TooltipTrigger>

					<TooltipContent side="left">Pieces</TooltipContent>
				</Tooltip>
			</div>
		</>
	);
}

export default VariantEditorPage;
