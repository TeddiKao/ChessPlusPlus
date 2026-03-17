import { Sheet, SheetContent } from "@/components/ui/sheet";
import usePieceSettingsStore from "@/features/variants/variantEditor/pieces/common/stores/pieceSettingsSheet";
import PiecesSelectionScreen from "@/features/variants/variantEditor/pieces/pieceSelection/components/PiecesSelectionScreen";
import PieceEditorScreen from "@/features/variants/variantEditor/pieces/pieceEditor/components/PieceEditorScreen";
import useVariantEditorSidebarStore from "@/features/variants/variantEditor/common/stores/variantEditorSidebar";

function PiecesMenu() {
	const {
		currentSelectedSetting,
		updateCurrentSelectedSetting,
		clearCurrentSelectedSetting,
	} = useVariantEditorSidebarStore();
	const { currentSheetMode } = usePieceSettingsStore();

	return (
		<Sheet
			open={currentSelectedSetting === "pieces"}
			onOpenChange={(open) =>
				open
					? updateCurrentSelectedSetting("pieces")
					: clearCurrentSelectedSetting()
			}
		>
			<SheetContent
				className="bg-sidebar-primary-foreground"
				showOverlay={false}
				showCloseButton={false}
			>
				{currentSheetMode === "pieceSelection" ? (
					<PiecesSelectionScreen />
				) : (
					<PieceEditorScreen />
				)}
			</SheetContent>
		</Sheet>
	);
}

export default PiecesMenu;
