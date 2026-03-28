import { Sheet, SheetContent } from "@/components/ui/sheet";
import useSidebarStore from "@/features/variants/variantEditor/stores/sidebar";
import useMovementsEditorSheetStore from "../../stores/movementsEditorSheet";
import { MovementSelectionScreen } from "@/features/variants/variantEditor/components/MovementsEditorSheet/components/MovementSelectionScreen";
import { MovementEditorScreen } from "@/features/variants/variantEditor/components/MovementsEditorSheet/components/MovementEditorScreen";

function MovementsEditorSheet() {
	const { currentOpenMenu, updateCurrentOpenMenu, clearCurrentOpenMenu } =
		useSidebarStore();
	const { currentMode } = useMovementsEditorSheetStore();

	return (
		<Sheet
			open={currentOpenMenu === "movements"}
			onOpenChange={(open) => {
				if (open) {
					updateCurrentOpenMenu("movements");
				} else {
					clearCurrentOpenMenu();
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
