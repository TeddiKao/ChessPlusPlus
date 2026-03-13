import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Grid2X2 } from "lucide-react";

function ChessboardSettingsButton() {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button type="button">
					<Grid2X2 strokeWidth={1.5} />
				</button>
			</TooltipTrigger>

			<TooltipContent side="left">Board settings</TooltipContent>
		</Tooltip>
	);
}

export default ChessboardSettingsButton;
