import { Button } from "@/components/ui/button";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError } from "@/components/ui/field";
import type { MovementRule } from "@/features/variants/common/types/movementRules";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import useAddChainedMoveDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/addChainedMoveDialog";
import { isNullOrUndefined } from "@/shared/utils/typeChecks";
import { FieldLabel } from "@/components/ui/field";
import type { ChangeEvent } from "react";

function AddChainedMoveDialog() {
	const { movementRulesDraft } = useVariantDraftStore();
	const {
		isChainedMoveDialogOpen,
		openChainedMoveDialog,
		closeChainedMoveDialog,
		movementToAdd,
		updateMovementToAdd,
		clearMovementToAdd,

		chainedMoveSequenceIndex,

		onAddChainedMove,
		clearOnAddChainedMove,
		additionalInfo,
		clearAdditionalInfo,

		errors,
		addErrors,
		clearErrors,
	} = useAddChainedMoveDialogStore();

	if (!movementRulesDraft) return null;

	function handleMovementNameInputChange(e: ChangeEvent<HTMLInputElement>) {
		updateMovementToAdd(e.target.value);
	}

	function handleAddChainedMoveButtonClick() {
		clearErrors();

		if (isNullOrUndefined(chainedMoveSequenceIndex)) return;
		if (isNullOrUndefined(onAddChainedMove)) return;

		if (!movementRulesDraft) return;

		const trimmedMovementToAdd = movementToAdd.trim();

		if (trimmedMovementToAdd === "") {
			addErrors(["Movement name cannot be empty"]);
			return;
		}

		if (!movementRulesDraft[trimmedMovementToAdd]) {
			addErrors(["Movement name is not valid"]);
			return;
		}

		onAddChainedMove(trimmedMovementToAdd, additionalInfo);

		clearMovementToAdd();
		closeChainedMoveDialog();
		clearOnAddChainedMove();
		clearAdditionalInfo();
		clearErrors();
	}

	function handleComboboxItemSelect(movementName: string) {
		updateMovementToAdd(movementName);
	}

	return (
		<Dialog
			modal={true}
			open={isChainedMoveDialogOpen}
			onOpenChange={(open) => {
				if (open) {
					openChainedMoveDialog();
				} else {
					closeChainedMoveDialog();
					clearMovementToAdd();
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add chained move</DialogTitle>
					<DialogDescription>
						Add a new chained move.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-2">
					<Field>
						<FieldLabel htmlFor="movementNameComboboxInput">Movement name</FieldLabel>
						<Combobox
							id="movementNameComboboxInput"
							modal={true}
							items={Object.entries(movementRulesDraft)}
							itemToStringValue={(
								movementEntry: [string, MovementRule],
							) => movementEntry[0]}
						>
							<ComboboxInput
								value={movementToAdd}
								onChange={handleMovementNameInputChange}
								placeholder="Select a move"
								data-invalid={errors.length > 0}
								aria-invalid={errors.length > 0}
							/>
							<ComboboxContent
								onWheel={(e) => e.stopPropagation()}
								className="pointer-events-auto"
							>
								<ComboboxEmpty>
									No movements found
								</ComboboxEmpty>
								<ComboboxList>
									{(
										movementEntry: [string, MovementRule],
									) => (
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

						<FieldError errors={errors.map((error) => ({ message: error }))} />
					</Field>
				</div>

				<DialogFooter>
					<Button
						onClick={handleAddChainedMoveButtonClick}
						className="w-full"
					>
						Add chained move
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default AddChainedMoveDialog;
