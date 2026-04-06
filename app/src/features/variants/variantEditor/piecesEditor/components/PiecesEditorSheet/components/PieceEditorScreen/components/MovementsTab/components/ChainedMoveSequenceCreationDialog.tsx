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
import type {
	ChainedMoveNode,
	RegularMove,
} from "@/features/variants/common/types/pieceRules";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import useChainedMoveSequenceCreationDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/chainedMoveSequenceCreationDialog";
import usePiecesEditorStore from "@/features/variants/variantEditor/piecesEditor/stores/piecesEditor";
import { IconSearch, IconX } from "@tabler/icons-react";
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
		clearSelectedMovements,
	} = useChainedMoveSequenceCreationDialogStore();
	const { addChainedMoveSequence } = usePiecesEditorStore();

	const { pieceRulesetDraft, movementRulesDraft } = useVariantDraftStore();
	if (!movementRulesDraft) return null;
	if (!pieceRulesetDraft) return null;

	const allRegularMovements = Object.values(pieceRulesetDraft).flatMap(
		(pieceRules) =>
			pieceRules.moveset
				.filter((move) => !Array.isArray(move))
				.map((regularMove) => (regularMove as RegularMove).moveName),
	);

	const allChainedMoves = Object.values(pieceRulesetDraft).flatMap(
		(pieceRules) =>
			pieceRules.moveset
				.filter((move) => Array.isArray(move))
				.flatMap((chainedMove) =>
					chainedMove.map(
						(move) => (move as ChainedMoveNode).moveName,
					),
				),
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

	function handleClearSelectionButtonClick() {
		clearSelectedMovements();
	}

	function handleCreateSequenceButtonClick() {
		addChainedMoveSequence(
			selectedMovements.map((move) => ({
				validMove: true,
				moveName: move[1],
			})),
		);

		closeChainedMoveSequenceCreationDialog();
		clearSelectedMovements();
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
								.map(([movementName]) => {
									const foundMovement =
										selectedMovements.find(
											(move) => move[1] === movementName,
										);

									const isSelected = !!foundMovement;

									const regularMoveUsageCount =
										allRegularMovements.filter(
											(move) => move === movementName,
										).length;

									const chainedMoveUsageCount =
										allChainedMoves.filter(
											(move) => move === movementName,
										).length;

									return (
										<div
											role="button"
											onClick={() =>
												handleMovementClick(
													movementName,
												)
											}
											aria-label="Select or deselect movement"
											className={clsx(
												"flex flex-row items-center justify-between gap-2 p-2 rounded-lg",
												isSelected
													? "bg-sidebar-primary-foreground hover:bg-(--sidebar-primary-hover)"
													: "hover:bg-muted",
											)}
										>
											<div className="flex flex-col gap-1">
												<p>{movementName}</p>
												<p className="text-muted-foreground">
													{regularMoveUsageCount >
														0 && (
														<span>
															{
																regularMoveUsageCount
															}{" "}
															regular
														</span>
													)}

													{regularMoveUsageCount >
														0 &&
														chainedMoveUsageCount >
															0 && (
															<span> • </span>
														)}

													{chainedMoveUsageCount >
														0 && (
														<span>
															{
																chainedMoveUsageCount
															}{" "}
															chained
														</span>
													)}
												</p>
											</div>

											{foundMovement && (
												<div className="flex flex-row items-center justify-center p-2 bg-primary rounded-full aspect-square size-6">
													<span className="text-primary-foreground text-sm">
														{foundMovement[0] + 1}
													</span>
												</div>
											)}
										</div>
									);
								})}
						</div>
					</ScrollArea>
				</div>

				<div className="flex flex-col gap-2">
					<Button
						className="w-full"
						onClick={handleCreateSequenceButtonClick}
						disabled={selectedMovements.length === 0}
					>
						Create sequence
					</Button>
					<Button
						variant="destructive"
						className="w-full"
						onClick={handleClearSelectionButtonClick}
					>
						Clear selection
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ChainedMoveSequenceCreationDialog;
