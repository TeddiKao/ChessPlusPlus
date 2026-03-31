import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import usePieceCreationDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/pieceCreationDialog";
import type { ChangeEvent } from "react";

function PieceCreationDialog() {

	const {
		isPieceCreationDialogOpen,
		openPieceCreationDialog,
		closePieceCreationDialog,
		pieceName,
		updatePieceName,
		pieceNameErrors,
	} = usePieceCreationDialogStore();

	function handlePieceNameInputChange(e: ChangeEvent<HTMLInputElement>) {
		updatePieceName(e.target.value);
	}
	
	return (
		<Dialog
			open={isPieceCreationDialogOpen}
			onOpenChange={(open) => (open ? openPieceCreationDialog() : closePieceCreationDialog())}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create piece</DialogTitle>
				</DialogHeader>

				<Field>
					<FieldLabel htmlFor="pieceNameInput">
						Piece name
					</FieldLabel>
					<Input
						id="pieceNameInput"
						type="text"
						placeholder="Enter piece name"
						value={pieceName}
						onChange={handlePieceNameInputChange}
						data-invalid={pieceNameErrors.length > 0}
						aria-invalid={pieceNameErrors.length > 0}
					/>
					<FieldError
						errors={pieceNameErrors.map((errorMessage) => ({
							message: errorMessage,
						}))}
					/>
				</Field>

				<DialogFooter>
					<Button>Create piece</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default PieceCreationDialog;