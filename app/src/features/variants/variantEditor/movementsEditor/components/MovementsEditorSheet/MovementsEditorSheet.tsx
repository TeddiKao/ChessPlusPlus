import { Sheet, SheetContent } from "@/components/ui/sheet";
import useSidebarStore from "@/features/variants/variantEditor/common/stores/sidebar";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import { MovementEditorScreen } from "@/features/variants/variantEditor/movementsEditor/components/MovementsEditorSheet/components/MovementEditorScreen";
import { MovementSelectionScreen } from "@/features/variants/variantEditor/movementsEditor/components/MovementsEditorSheet/components/MovementSelectionScreen";
import useMovementsEditorSheetStore from "@/features/variants/variantEditor/movementsEditor/stores/movementsEditorSheet";

function MovementsEditorSheet() {
	const { currentOpenMenu, updateCurrentOpenMenu, clearCurrentOpenMenu } =
		useSidebarStore();
	const { currentMode, updateCurrentMode } = useMovementsEditorSheetStore();
	const { syncPieceRulesetDraftToDB, syncMovementRulesDraftToDB } = useVariantDraftStore();

	return (
		<Sheet
			open={currentOpenMenu === "movements"}
			onOpenChange={(open) => {
				if (open) {
					updateCurrentOpenMenu("movements");
				} else {
					clearCurrentOpenMenu();
					updateCurrentMode("movementSelection");
					
					syncPieceRulesetDraftToDB();
					syncMovementRulesDraftToDB();
				}
			}}
		>
			<SheetContent
				className="bg-sidebar-primary-foreground"
				showCloseButton={false}
			>
				{currentMode === "movementSelection" ? (
					<MovementSelectionScreen />
				) : (
					<MovementEditorScreen />
				)}
			</SheetContent>
		</Sheet>
	);
}

export default MovementsEditorSheet;
