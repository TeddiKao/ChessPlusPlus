import ChessboardGridIcon from "@/features/variants/icons/ChessboardGridIcon";
import { ChessKnightIcon } from "lucide-react";
import { IconArrowsMove } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import useVariantDraftStore from "@/features/variants/variantEditor/stores/variantDraft";
import useSetupSettingsEditorStore from "@/features/variants/variantEditor/stores/setupSettingsEditor";
import MovementsEditorSheet from "@/features/variants/variantEditor/components/MovementsEditorSheet/MovementsEditorSheet";
import useSidebarStore from "@/features/variants/variantEditor/stores/sidebar";
import BoardSettingsMenu from "@/features/variants/variantEditor/components/BoardSettingsMenu";
import PiecesEditorSheet from "@/features/variants/variantEditor/components/PiecesEditorSheet/PiecesEditorSheet";

function Sidebar() {
	const { currentOpenMenu, updateCurrentOpenMenu, clearCurrentOpenMenu } =
		useSidebarStore();
	const { syncSetupRulesDraftToDB } = useVariantDraftStore();
	const { commitToDraft } = useSetupSettingsEditorStore();

	return (
		<>
			<div className="flex flex-col gap-4 items-center absolute right-0 top-0 h-screen bg-sidebar-primary-foreground p-3">
				<Popover
					open={currentOpenMenu === "boardSettings"}
					onOpenChange={(open) => {
						if (open) {
							updateCurrentOpenMenu("boardSettings");
						} else {
							clearCurrentOpenMenu();

							commitToDraft();
							syncSetupRulesDraftToDB();
						}
					}}
				>
					<Tooltip>
						<TooltipTrigger asChild>
							<PopoverTrigger asChild>
								<Button
									variant="ghost"
									className="p-1 hover:bg-(--sidebar-primary-hover)"
									aria-label="Board settings"
								>
									<ChessboardGridIcon className="size-5" />
								</Button>
							</PopoverTrigger>
						</TooltipTrigger>

						<TooltipContent side="left" sideOffset={8}>
							Board settings
						</TooltipContent>
					</Tooltip>

					<BoardSettingsMenu />
				</Popover>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							className="p-1 hover:bg-(--sidebar-primary-hover)"
							aria-label="Pieces"
							onClick={() => updateCurrentOpenMenu("pieces")}
						>
							<ChessKnightIcon
								strokeWidth={1.5}
								className="size-6"
							/>
						</Button>
					</TooltipTrigger>
					<TooltipContent side="left" sideOffset={8}>
						Pieces
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							className="p-1 hover:bg-(--sidebar-primary-hover)"
							aria-label="Movements"
							onClick={() => updateCurrentOpenMenu("movements")}
						>
							<IconArrowsMove
								strokeWidth={1.5}
								className="size-6"
							/>
						</Button>
					</TooltipTrigger>
					<TooltipContent side="left" sideOffset={8}>
						Movements
					</TooltipContent>
				</Tooltip>
			</div>

			<MovementsEditorSheet />
			<PiecesEditorSheet />
		</>
	);
}

export default Sidebar;
