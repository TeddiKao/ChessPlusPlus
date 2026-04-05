import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import useEditChainedMoveDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/editChainedMoveDialog";

function EditChainedMoveDialog() {
	const {
		isEditChainedMoveDialogOpen,
		openEditChainedMoveDialog,
		closeEditChainedMoveDialog,
	} = useEditChainedMoveDialogStore();

	return (
		<Dialog
			open={isEditChainedMoveDialogOpen}
			onOpenChange={(open) => {
				if (open) {
					openEditChainedMoveDialog();
				} else {
					closeEditChainedMoveDialog();
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit chained move</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default EditChainedMoveDialog;
