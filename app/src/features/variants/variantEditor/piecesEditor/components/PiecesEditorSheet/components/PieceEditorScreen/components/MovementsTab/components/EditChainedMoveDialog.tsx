import { Button } from "@/components/ui/button";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import type { MovementRule } from "@/features/variants/common/types/movementRules";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import useEditChainedMoveDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/editChainedMoveDialog";
import type { ChangeEvent } from "react";

function EditChainedMoveDialog() {
	const {
		isEditChainedMoveDialogOpen,
		openEditChainedMoveDialog,
		closeEditChainedMoveDialog,

		newMovementName,
		updateNewMovementName,
		clearNewMovementName,

		clearSequenceIndex,
		clearNodeIndex,
	} = useEditChainedMoveDialogStore();

	const { movementRulesDraft } = useVariantDraftStore();
	if (!movementRulesDraft) return null;

	function handleMovementNameInputChange(e: ChangeEvent<HTMLInputElement>) {
		updateNewMovementName(e.target.value);
	}

	function handleComboboxItemSelect(movementName: string) {
		updateNewMovementName(movementName);
	}

	function handleEditChainedMoveButtonClick() {

	}

	return (
		<Dialog
			open={isEditChainedMoveDialogOpen}
			onOpenChange={(open) => {
				if (open) {
					openEditChainedMoveDialog();
				} else {
					closeEditChainedMoveDialog();
					clearNewMovementName();
					clearSequenceIndex();
					clearNodeIndex();
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit chained move</DialogTitle>
				</DialogHeader>

				<Field>
					<FieldLabel htmlFor="movementNameComboboxInput">
						Movement name
					</FieldLabel>
					<Combobox
						id="movementNameComboboxInput"
						modal={true}
						items={Object.entries(movementRulesDraft)}
						itemToStringValue={(
							movementEntry: [string, MovementRule],
						) => movementEntry[0]}
					>
						<ComboboxInput
							value={newMovementName}
							onChange={handleMovementNameInputChange}
							placeholder="Select a move"
						/>
						<ComboboxContent
							onWheel={(e) => e.stopPropagation()}
							className="pointer-events-auto"
						>
							<ComboboxEmpty>No movements found</ComboboxEmpty>
							<ComboboxList>
								{(movementEntry: [string, MovementRule]) => (
									<ComboboxItem
										onClick={() =>
											handleComboboxItemSelect(
												movementEntry[0],
											)
										}
										key={movementEntry[0]}
										value={movementEntry[0]}
									>
										{movementEntry[0]}
									</ComboboxItem>
								)}
							</ComboboxList>
						</ComboboxContent>
					</Combobox>
				</Field>

				<DialogFooter>
					<Button onClick={handleEditChainedMoveButtonClick} className="w-full">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default EditChainedMoveDialog;
