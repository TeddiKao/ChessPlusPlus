import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import useSidebarStore from "@/features/variants/variantEditor/stores/sidebar";
import { Button } from "@/components/ui/button";
import useVariantDraftStore from "@/features/variants/variantEditor/stores/variantDraft";
import useMovementsEditorSheetStore from "../stores/movementsEditorSheet";
import useMovementsEditorStore from "../stores/movementsEditor";

function MovementSelectionScreen() {
	const { movementRulesDraft } = useVariantDraftStore();
	const { updateCurrentMode } = useMovementsEditorSheetStore();
	const { updateActiveMovementName } = useMovementsEditorStore();

	if (!movementRulesDraft) return null;

	function handlePieceMovementClick(movementName: string) {
		updateCurrentMode("movementEditing");
		updateActiveMovementName(movementName);
	}

	return (
		<>
			<SheetHeader className="px-4 pt-4">
				<SheetTitle>Movements editor</SheetTitle>
				<SheetDescription>
					Edit piece movement rules here
				</SheetDescription>
			</SheetHeader>

			<div className="flex flex-col overflow-y-auto px-3">
				{Object.entries(movementRulesDraft).map(([movementName]) => (
					<Button
						className="p-0 px-1 text-left justify-start hover:bg-(--sidebar-primary-hover)"
						variant="ghost"
						onClick={() => handlePieceMovementClick(movementName)}
					>
						{movementName}
					</Button>
				))}
			</div>

			<SheetFooter className="px-4 pb-4">
				<Button>Create movement</Button>
				<SheetClose asChild>
					<Button variant="outline">Close</Button>
				</SheetClose>
			</SheetFooter>
		</>
	);
}

function MovementEditorScreen() {
	return (
		<>
			<SheetHeader className="px-4 pt-4">
				<SheetTitle>Movement editor</SheetTitle>
				<SheetDescription>
					Edit movement rules here
				</SheetDescription>
			</SheetHeader>

			<SheetFooter className="px-4 pb-4">
				<Button variant="destructive">Delete movement</Button>
			</SheetFooter>
		</>
	);
}

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
