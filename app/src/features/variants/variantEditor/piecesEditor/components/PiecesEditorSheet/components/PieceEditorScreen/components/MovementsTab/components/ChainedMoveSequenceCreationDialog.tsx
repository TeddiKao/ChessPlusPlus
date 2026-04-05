import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

function ChainedMoveSequenceCreationDialog() {
	return (
		<Dialog>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create sequence</DialogTitle>
					<DialogDescription>Select movements from the list below to create a sequence.</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default ChainedMoveSequenceCreationDialog;