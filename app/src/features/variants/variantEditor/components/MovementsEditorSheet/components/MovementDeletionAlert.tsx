import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialog } from "@/components/ui/alert-dialog";
import useDeleteMovementAlertStore from "@/features/variants/variantEditor/stores/deleteMovementAlert";
import useMovementsEditorStore from "@/features/variants/variantEditor/stores/movementsEditor";
import useMovementsEditorSheetStore from "@/features/variants/variantEditor/stores/movementsEditorSheet";
import useVariantDraftStore from "@/features/variants/variantEditor/stores/variantDraft";

function MovementDeletionAlert() {
	const {
		isDeleteMovementAlertOpen,
		openDeleteMovementAlert,
		closeDeleteMovementAlert,
		movementToDelete,
		clearMovementToDelete,
	} = useDeleteMovementAlertStore();
	const {
		movementRulesDraft,
		updateMovementRulesDraft,
		syncMovementRulesDraftToDB,
	} = useVariantDraftStore();
	const { updateCurrentMode } = useMovementsEditorSheetStore();
	const { resetMovementsEditorState } = useMovementsEditorStore();

	if (!movementRulesDraft) return null;

	function handleMovementDelete() {
		if (!movementRulesDraft) return;
		if (!movementToDelete) return;

		const newMovementRulesDraft = structuredClone(movementRulesDraft);
		delete newMovementRulesDraft[movementToDelete];

		updateMovementRulesDraft(newMovementRulesDraft);
		syncMovementRulesDraftToDB();

		closeDeleteMovementAlert();

		updateCurrentMode("movementSelection");
		resetMovementsEditorState();
	}

	return (
		<AlertDialog
			open={isDeleteMovementAlertOpen}
			onOpenChange={(open) => {
				if (open) {
					openDeleteMovementAlert();
				} else {
					closeDeleteMovementAlert();
					clearMovementToDelete();
				}
			}}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete movement?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete this movement? This
						action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel className="px-4">
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						className="px-4"
						onClick={handleMovementDelete}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default MovementDeletionAlert;
