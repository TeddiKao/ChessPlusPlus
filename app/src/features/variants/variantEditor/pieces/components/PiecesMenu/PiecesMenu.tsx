import { Sheet } from "@/components/ui/sheet";
import usePieceSettingsStore from "@/features/variants/variantEditor/pieces/stores/pieceSettingsSheet";
import PiecesSelectionScreen from "@/features/variants/variantEditor/pieces/components/PiecesMenu/components/PiecesSelectionScreen";

function PiecesMenu() {
	const {
		isOpen,
		openPieceSettingsSheet,
		closePieceSettingsSheet,
		currentSheetMode,
	} = usePieceSettingsStore();

	return (
		<Sheet
			open={isOpen}
			onOpenChange={(open) =>
				open ? openPieceSettingsSheet() : closePieceSettingsSheet()
			}
		>
			{currentSheetMode === "pieceSelection" ? (
				<PiecesSelectionScreen />
			) : null}
		</Sheet>
	);
}

export default PiecesMenu;
