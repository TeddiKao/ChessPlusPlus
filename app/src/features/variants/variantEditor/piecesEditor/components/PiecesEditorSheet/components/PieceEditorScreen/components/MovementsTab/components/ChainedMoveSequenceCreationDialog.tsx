import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import useChainedMoveSequenceCreationDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/chainedMoveSequenceCreationDialog";

function ChainedMoveSequenceCreationDialog() {
	const {
		isChainedMoveSequenceCreationDialogOpen,
		openChainedMoveSequenceCreationDialog,
		closeChainedMoveSequenceCreationDialog,
	} = useChainedMoveSequenceCreationDialogStore();

	return (
		<Dialog
			open={isChainedMoveSequenceCreationDialogOpen}
			onOpenChange={(open) => {
				if (open) {
					openChainedMoveSequenceCreationDialog();
				} else {
					closeChainedMoveSequenceCreationDialog();
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create sequence</DialogTitle>
					<DialogDescription>
						Select movements from the list below to create a
						sequence.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default ChainedMoveSequenceCreationDialog;
