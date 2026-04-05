import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { RegularMove } from "@/features/variants/common/types/pieceRules";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import useChainedMoveSequenceCreationDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/chainedMoveSequenceCreationDialog";
import { IconCheck, IconSearch, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import type { ChangeEvent } from "react";

function ChainedMoveSequenceCreationDialog() {
	const {
		isChainedMoveSequenceCreationDialogOpen,
		openChainedMoveSequenceCreationDialog,
		closeChainedMoveSequenceCreationDialog,

		searchQuery,
		updateSearchQuery,
		clearSearchQuery,

		selectedMovements,
		selectMovement,
		deselectMovement,
	} = useChainedMoveSequenceCreationDialogStore();

	const { pieceRulesetDraft, movementRulesDraft } = useVariantDraftStore();
	if (!movementRulesDraft) return null;
	if (!pieceRulesetDraft) return null;

	const allRegularMovements = Object.values(pieceRulesetDraft).flatMap(
		(pieceRules) =>
			pieceRules.moveset
				.filter((move) => !Array.isArray(move))
				.map((regularMove) => (regularMove as RegularMove).moveName),
	);

	function handleSearchQueryInputChange(e: ChangeEvent<HTMLInputElement>) {
		updateSearchQuery(e.target.value);
	}

	function handleClearSearchQueryButtonClick() {
		clearSearchQuery();
	}

	function handleMovementClick(movementName: string) {
		if (selectedMovements.some((move) => move[1] === movementName)) {
			deselectMovement(movementName);
		} else {
			selectMovement(movementName);
		}
	}

	return (
		<Dialog
			open={isChainedMoveSequenceCreationDialogOpen}
			onOpenChange={(open) => {
				if (open) {
					openChainedMoveSequenceCreationDialog();
				} else {
					closeChainedMoveSequenceCreationDialog();
				}
			}}
		>
			<DialogContent className="h-[90vh] flex flex-col">
				<DialogHeader>
					<DialogTitle>Create sequence</DialogTitle>
					<DialogDescription>
						Select movements from the list below to create a
						sequence.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-4 flex-1 min-h-0">
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

					<ScrollArea className="flex-1 min-h-0">
						<div className="flex flex-col gap-2 pr-4">
							{Object.entries(movementRulesDraft)
								.filter(([movementName]) =>
									movementName.includes(searchQuery),
								)
								.map(([movementName]) => (
									<div
										role="button"
										onClick={() =>
											handleMovementClick(movementName)
										}
										aria-label="Select or deselect movement"
										className={clsx(
											"flex flex-row items-center justify-between gap-2 p-2 rounded-lg",
											selectedMovements.some(
												(move) =>
													move[1] === movementName,
											)
												? "bg-sidebar-primary-foreground hover:bg-(--sidebar-primary-hover)"
												: "hover:bg-muted",
										)}
									>
										<div className="flex flex-col gap-1">
											<p>{movementName}</p>
											<p className="text-muted-foreground">
												{
													allRegularMovements.filter(
														(move) =>
															move ===
															movementName,
													).length
												}{" "}
												{allRegularMovements.filter(
													(move) =>
														move ===
														movementName,
												).length === 1
													? "usage"
													: "usages"}
											</p>
										</div>

										{selectedMovements.some(
											(move) =>
												move[1] === movementName,
										) && (
											<div className="flex flex-row items-center justify-center">
												<IconCheck
													className="size-5 stroke-primary"
													stroke={1.5}
												/>
											</div>
										)}
									</div>
								))}
						</div>
					</ScrollArea>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ChainedMoveSequenceCreationDialog;
