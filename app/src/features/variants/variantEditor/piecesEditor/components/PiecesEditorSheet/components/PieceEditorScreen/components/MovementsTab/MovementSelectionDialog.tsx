import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import useMovementSelectionDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/movementSelectionDialog";
import { IconSearch } from "@tabler/icons-react";

function MovementSelectionDialog() {
	const {
		isMovementSelectionDialogOpen,
		openMovementSelectionDialog,
		closeMovementSelectionDialog,
	} = useMovementSelectionDialogStore();

	return (
		<Dialog
			open={isMovementSelectionDialogOpen}
			onOpenChange={(isOpen) => {
				if (isOpen) {
					openMovementSelectionDialog();
				} else {
					closeMovementSelectionDialog();
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Select movements</DialogTitle>
					<DialogDescription>
						Select the movements you want to add to the piece.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col">
					<InputGroup>
						<InputGroupInput
							type="text"
							placeholder="Search movements"
						/>
						<InputGroupAddon align="inline-start">
							<IconSearch />
						</InputGroupAddon>
					</InputGroup>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default MovementSelectionDialog;
