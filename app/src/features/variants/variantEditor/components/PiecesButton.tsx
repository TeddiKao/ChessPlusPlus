import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChessKnight } from "lucide-react";
import PiecesMenu from "@/features/variants/variantEditor/components/menus/PiecesMenu";
import usePieceSettingsStore from "@/features/variants/variantEditor/stores/pieceSettings/pieceSettings";

function PiecesButton() {
	const { openPieceSettingsSheet } = usePieceSettingsStore();

	return (
		<>
			<Tooltip>
				<TooltipTrigger asChild>
					<button onClick={openPieceSettingsSheet} type="button">
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
