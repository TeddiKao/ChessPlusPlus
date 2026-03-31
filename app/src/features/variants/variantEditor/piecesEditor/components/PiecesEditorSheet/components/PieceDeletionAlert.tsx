import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import usePieceDeletionAlertStore from "@/features/variants/variantEditor/piecesEditor/stores/pieceDeletionAlert";

function PieceDeletionAlert() {
	const { isPieceDeletionAlertOpen, openPieceDeletionAlert, closePieceDeletionAlert } = usePieceDeletionAlertStore();

	return (
		<AlertDialog
			open={isPieceDeletionAlertOpen}
			onOpenChange={(open) => (open ? openPieceDeletionAlert() : closePieceDeletionAlert())}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete piece?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete this piece? This action
						cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel className="px-4">
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction className="px-4">
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default PieceDeletionAlert;
