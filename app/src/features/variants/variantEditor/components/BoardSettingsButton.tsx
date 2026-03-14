import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Grid2X2 } from "lucide-react";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import BoardSettingsMenu from "@/features/variants/variantEditor/components/menus/BoardSettingsMenu";
import useVariantEditorSidebarStore from "@/features/variants/variantEditor/stores/variantEditorSidebar";

function BoardSettingsButton() {
	const {
		currentSelectedSetting,
		updateCurrentSelectedSetting,
		clearCurrentSelectedSetting,
	} = useVariantEditorSidebarStore();

	return (
		<Popover
			open={currentSelectedSetting === "board"}
			onOpenChange={(open) =>
				open
					? updateCurrentSelectedSetting("board")
					: clearCurrentSelectedSetting()
			}
		>
			<Tooltip>
				<TooltipTrigger asChild>
					<PopoverTrigger asChild>
						<button
							onClick={() =>
								updateCurrentSelectedSetting("board")
							}
							type="button"
						>
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

export default BoardSettingsButton;
