import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Grid2X2 } from "lucide-react";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import BoardSettingsMenu from "@/features/variants/variantEditor/components/menus/BoardSettingsMenu";

function ChessboardSettingsButton() {
	return (
		<Popover>
			<Tooltip>
				<TooltipTrigger asChild>
					<PopoverTrigger asChild>
						<button type="button">
							<Grid2X2 strokeWidth={1.5} />
						</button>
					</PopoverTrigger>
				</TooltipTrigger>

				<TooltipContent side="left">Board settings</TooltipContent>
			</Tooltip>

			<BoardSettingsMenu />
		</Popover>
	);
}

export default ChessboardSettingsButton;
