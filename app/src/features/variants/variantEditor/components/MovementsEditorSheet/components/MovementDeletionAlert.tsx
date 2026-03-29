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
import useVariantDraftStore from "@/features/variants/variantEditor/stores/variantDraft";

function MovementDeletionAlert() {
	const {
		isDeleteMovementAlertOpen,
		openDeleteMovementAlert,
		closeDeleteMovementAlert,
		movementToDelete,
        clearMovementToDelete
	} = useDeleteMovementAlertStore();
	const { movementRulesDraft, updateMovementRulesDraft } =
		useVariantDraftStore();

	if (!movementRulesDraft) return null;

	function handleMovementDelete() {
		if (!movementRulesDraft) return;
		if (!movementToDelete) return;

		const newMovementRulesDraft = structuredClone(movementRulesDraft);
		delete newMovementRulesDraft[movementToDelete];

		updateMovementRulesDraft(newMovementRulesDraft);
		closeDeleteMovementAlert();
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
