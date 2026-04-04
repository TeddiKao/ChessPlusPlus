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
import type { MovementRule } from "@/features/variants/common/types/movementRules";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import useAddChainedMoveDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/addChainedMoveDialog";
import type { ChangeEvent } from "react";

function AddChainedMoveDialog() {
	const { movementRulesDraft } = useVariantDraftStore();
	const { movementToAdd, updateMovementToAdd, clearMovementToAdd } =
		useAddChainedMoveDialogStore();
	const {
		isChainedMoveDialogOpen,
		openChainedMoveDialog,
		closeChainedMoveDialog,
	} = useAddChainedMoveDialogStore();

	if (!movementRulesDraft) return null;

	function handleMovementNameInputChange(e: ChangeEvent<HTMLInputElement>) {
		updateMovementToAdd(e.target.value);
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
						Add a new chained move to the end of the sequence.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-2">
					<Combobox
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
						/>
						<ComboboxContent
							onWheel={(e) => e.stopPropagation()}
							className="pointer-events-auto"
						>
							<ComboboxEmpty>No movements found</ComboboxEmpty>
							<ComboboxList>
								{(movementEntry: [string, MovementRule]) => (
									<ComboboxItem
										key={movementEntry[0]}
										value={movementEntry[0]}
									>
										{movementEntry[0]}
									</ComboboxItem>
								)}
							</ComboboxList>
						</ComboboxContent>
					</Combobox>
				</div>

				<DialogFooter>
					<Button className="w-full" variant="default">
						Add chained move
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default AddChainedMoveDialog;
