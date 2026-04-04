import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useChainedMovesDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/chainedMovesDialog";

function ChainedMovesDialog() {
	const { isChainedMovesDialogOpen, openChainedMovesDialog, closeChainedMovesDialog, clearActivePiece } = useChainedMovesDialogStore();

	return (
		<Dialog open={isChainedMovesDialogOpen} onOpenChange={(open) => {
			if (open) {
				openChainedMovesDialog();
			} else {
				closeChainedMovesDialog();
				clearActivePiece();
			}
		}}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Chained moves</DialogTitle>
					<DialogDescription>View and modify chained move sequences</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default ChainedMovesDialog;