import { Sheet, SheetContent } from "@/components/ui/sheet";
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
			<SheetContent
				className="bg-sidebar-primary-foreground"
				showOverlay={false}
			>
				{currentSheetMode === "pieceSelection" ? (
					<PiecesSelectionScreen />
				) : null}
			</SheetContent>
		</Sheet>
	);
}

export default PiecesMenu;
