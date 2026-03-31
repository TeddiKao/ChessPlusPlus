import { Sheet, SheetContent } from "@/components/ui/sheet";
import useSidebarStore from "@/features/variants/variantEditor/common/stores/sidebar";
import { MovementEditorScreen } from "@/features/variants/variantEditor/movementsEditor/components/MovementsEditorSheet/components/MovementEditorScreen";
import { MovementSelectionScreen } from "@/features/variants/variantEditor/movementsEditor/components/MovementsEditorSheet/components/MovementSelectionScreen";
import useMovementsEditorSheetStore from "@/features/variants/variantEditor/movementsEditor/stores/movementsEditorSheet";

function MovementsEditorSheet() {
	const { currentOpenMenu, updateCurrentOpenMenu, clearCurrentOpenMenu } =
		useSidebarStore();
	const { currentMode, updateCurrentMode } = useMovementsEditorSheetStore();

	return (
		<Sheet
			open={currentOpenMenu === "movements"}
			onOpenChange={(open) => {
				if (open) {
					updateCurrentOpenMenu("movements");
				} else {
					clearCurrentOpenMenu();
					updateCurrentMode("movementSelection");
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
