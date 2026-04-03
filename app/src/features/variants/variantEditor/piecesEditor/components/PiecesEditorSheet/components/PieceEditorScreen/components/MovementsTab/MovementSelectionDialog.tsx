import { Button } from "@/components/ui/button";
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
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import useMovementSelectionDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/movementSelectionDialog";
import { IconSearch, IconX } from "@tabler/icons-react";

function MovementSelectionDialog() {
	const {
		isMovementSelectionDialogOpen,
		openMovementSelectionDialog,
		closeMovementSelectionDialog,
		searchQuery,
		updateSearchQuery,
		clearSearchQuery,
	} = useMovementSelectionDialogStore();

	const { movementRulesDraft } = useVariantDraftStore();
	if (!movementRulesDraft) return null;

	function handleClearSearchQueryButtonClick() {
		clearSearchQuery();
	}

	function handleSearchQueryInputChange(
		e: React.ChangeEvent<HTMLInputElement>,
	) {
		updateSearchQuery(e.target.value);
	}

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
			<DialogContent className="max-h-[90vh]">
				<DialogHeader>
					<DialogTitle>Select movements</DialogTitle>
					<DialogDescription>
						Select the movements you want to add to the piece.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-4">
					<InputGroup>
						<InputGroupInput
							type="text"
							placeholder="Search movements"
							value={searchQuery}
							onChange={handleSearchQueryInputChange}
						/>

						<InputGroupAddon align="inline-start">
							<IconSearch />
						</InputGroupAddon>

						{searchQuery.length > 0 && (
							<InputGroupAddon align="inline-end">
								<Button
									variant="ghost"
									className="stroke-muted-foreground p-0 px-1"
									onClick={handleClearSearchQueryButtonClick}
								>
									<IconX />
								</Button>
							</InputGroupAddon>
						)}
					</InputGroup>

					<div className="flex flex-col gap-2 overflow-y-auto">
						{Object.entries(movementRulesDraft).map(([movementName]) => (
							<div key={movementName} className="flex flex-row items-center justify-between">
								<p>{movementName}</p>
							</div>
						))}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default MovementSelectionDialog;
