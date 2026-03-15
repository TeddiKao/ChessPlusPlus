import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChessKnight } from "lucide-react";
import PiecesMenu from "@/features/variants/variantEditor/components/menus/PiecesMenu";

function PiecesButton() {
	return (
		<>
			<Tooltip>
				<TooltipTrigger asChild>
					<button type="button">
						<ChessKnight strokeWidth={1.5} />
					</button>
				</TooltipTrigger>

				<TooltipContent side="left">Pieces</TooltipContent>
			</Tooltip>

			<PiecesMenu />
		</>
	);
}

export default PiecesButton;
