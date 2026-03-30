import { Sheet, SheetContent } from "@/components/ui/sheet";
import useSidebarStore from "@/features/variants/variantEditor/stores/sidebar";
import useVariantDraftStore from "@/features/variants/variantEditor/stores/variantDraft";
import { PieceSelectionScreen } from "@/features/variants/variantEditor/components/PiecesEditorSheet/components/PieceSelectionScreen";
import usePiecesEditorSheetStore from "@/features/variants/variantEditor/stores/piecesEditorSheet";
import PieceEditorScreen from "@/features/variants/variantEditor/components/PiecesEditorSheet/components/PieceEditorScreen";

function PiecesEditorSheet() {
	const { currentOpenMenu, updateCurrentOpenMenu, clearCurrentOpenMenu } =
		useSidebarStore();
	const { currentMode } = usePiecesEditorSheetStore();

	const { pieceRulesetDraft } = useVariantDraftStore();
	if (!pieceRulesetDraft) return null;

	return (
		<Sheet
			open={currentOpenMenu === "pieces"}
			onOpenChange={(open) => {
				if (open) {
					updateCurrentOpenMenu("pieces");
				} else {
					clearCurrentOpenMenu();
				}
			}}
		>
			<SheetContent
				className="bg-sidebar-primary-foreground"
				showCloseButton={false}
			>
				{currentMode === "pieceSelection" ? (
					<PieceSelectionScreen />
				) : (
					<PieceEditorScreen />
				)}
			</SheetContent>
		</Sheet>
	);
}

export default PiecesEditorSheet;
