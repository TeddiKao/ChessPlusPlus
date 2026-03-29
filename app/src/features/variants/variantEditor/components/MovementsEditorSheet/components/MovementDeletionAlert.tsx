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
		pieceRulesetDraft,
		updateMovementRulesDraft,
		updatePieceRulesetDraft,
		syncMovementRulesDraftToDB,
		syncPieceRulesetDraftToDB,
	} = useVariantDraftStore();
	const { updateCurrentMode } = useMovementsEditorSheetStore();
	const { resetMovementsEditorState } = useMovementsEditorStore();

	if (!movementRulesDraft) return null;

	function handleMovementDelete() {
		if (!movementRulesDraft) return;
		if (!movementToDelete) return;

		if (!pieceRulesetDraft) return;

		const newMovementRulesDraft = structuredClone(movementRulesDraft);
		delete newMovementRulesDraft[movementToDelete];

		const updatedPieceRulesetDraft = structuredClone(pieceRulesetDraft);
		
		for (const [pieceName] of Object.entries(updatedPieceRulesetDraft)) {
			updatedPieceRulesetDraft[pieceName].moveset = pieceRulesetDraft[pieceName].moveset.map((move) => {
				if (Array.isArray(move)) {
					return move.filter((chainedMove) => chainedMove.moveName !== movementToDelete);
				}
				if (move.moveName === movementToDelete) {
					return null;
				}
				return move;
			}).filter((move) => move !== null);
		}
		

		updateMovementRulesDraft(newMovementRulesDraft);
		updatePieceRulesetDraft(updatedPieceRulesetDraft);
		syncMovementRulesDraftToDB();
		syncPieceRulesetDraftToDB();

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
