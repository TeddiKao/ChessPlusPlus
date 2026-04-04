import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function ChainedMovesDialog() {
	return (
		<Dialog>
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