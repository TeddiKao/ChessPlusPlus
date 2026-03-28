import useMovementsEditorStore from "@/features/variants/variantEditor/stores/movementsEditor";
import useMovementsEditorSheetStore from "@/features/variants/variantEditor/stores/movementsEditorSheet";
import {
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { IconChevronLeft } from "@tabler/icons-react";

export function MovementEditorScreen() {
	const { activeMovementName } = useMovementsEditorStore();
	const { updateCurrentMode } = useMovementsEditorSheetStore();

	function handleBackClick() {
		updateCurrentMode("movementSelection");
	}

	return (
		<>
			<SheetHeader>
				<div className="flex flex-row gap-2 items-center">
					<Button
						className="p-0 hover:bg-(--sidebar-primary-hover)"
						variant="ghost"
						onClick={handleBackClick}
					>
						<IconChevronLeft className="size-5" />
					</Button>

					<SheetTitle>Movement editor</SheetTitle>
				</div>

				<SheetDescription>
					You are currently editing the movement rule "
					{activeMovementName}". Click on the back arrow to change
					your selection.
				</SheetDescription>
			</SheetHeader>

			<SheetFooter>
				<Button variant="destructive">Delete movement</Button>
			</SheetFooter>
		</>
	);
}
