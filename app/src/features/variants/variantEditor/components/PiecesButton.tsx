import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChessKnight } from "lucide-react";

function PiecesButton() {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button type="button">
					<ChessKnight strokeWidth={1.5} />
				</button>
			</TooltipTrigger>

			<TooltipContent side="left">Pieces</TooltipContent>
		</Tooltip>
	);
}

export default PiecesButton;
