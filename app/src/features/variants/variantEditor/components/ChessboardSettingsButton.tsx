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
		<Tooltip>
			<TooltipTrigger asChild>
				<Popover>
					<PopoverTrigger asChild>
						<button type="button">
							<Grid2X2 strokeWidth={1.5} />
						</button>
					</PopoverTrigger>

					<BoardSettingsMenu />
				</Popover>
			</TooltipTrigger>

			<TooltipContent side="left">Board settings</TooltipContent>
		</Tooltip>
	);
}

export default ChessboardSettingsButton;
