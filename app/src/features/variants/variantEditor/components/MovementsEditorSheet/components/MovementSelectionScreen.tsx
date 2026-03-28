import useVariantDraftStore from "@/features/variants/variantEditor/stores/variantDraft";
import useMovementsEditorSheetStore from "@/features/variants/variantEditor/stores/movementsEditorSheet";
import useMovementsEditorStore from "@/features/variants/variantEditor/stores/movementsEditor";
import {
	SheetClose,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";

export function MovementSelectionScreen() {
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
			<SheetHeader>
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

			<SheetFooter>
				<Button>Create movement</Button>
				<SheetClose asChild>
					<Button variant="outline">Close</Button>
				</SheetClose>
			</SheetFooter>
		</>
	);
}