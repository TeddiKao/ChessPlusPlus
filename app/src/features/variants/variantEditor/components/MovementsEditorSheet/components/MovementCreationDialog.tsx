import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useCreateMovementDialogStore from "@/features/variants/variantEditor/stores/createMovementDialog";

function MovementCreationDialog() {
	const {
		isCreateMovementDialogOpen,
		openCreateMovementDialog,
		closeCreateMovementDialog,
		movementNameErrors,
	} = useCreateMovementDialogStore();

	return (
		<Dialog
			open={isCreateMovementDialogOpen}
			onOpenChange={(open) => {
				if (open) {
					openCreateMovementDialog();
				} else {
					closeCreateMovementDialog();
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Movement</DialogTitle>
				</DialogHeader>

				<Field data-invalid={movementNameErrors.length > 0} className="gap-2">
					<FieldLabel htmlFor="movementNameInput">
						Movement Name
					</FieldLabel>
					<Input
						id="movementNameInput"
						type="text"
						placeholder="Enter movement name"
						aria-invalid={movementNameErrors.length > 0}
					/>
					<FieldError
						errors={movementNameErrors.map((errorMessage) => ({
							message: errorMessage,
						}))}
					/>
				</Field>

				<DialogFooter>
					<Button className="px-4">Create</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default MovementCreationDialog;
