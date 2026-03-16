import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChessKnight } from "lucide-react";
import PiecesMenu from "@/features/variants/variantEditor/pieces/components/PiecesMenu/PiecesMenu";
import useVariantEditorSidebarStore from "@/features/variants/variantEditor/common/stores/variantEditorSidebar";

function PiecesButton() {
	const { updateCurrentSelectedSetting } = useVariantEditorSidebarStore();

	return (
		<>
			<Tooltip>
				<TooltipTrigger asChild>
					<button
						type="button"
						onClick={() => updateCurrentSelectedSetting("pieces")}
					>
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
