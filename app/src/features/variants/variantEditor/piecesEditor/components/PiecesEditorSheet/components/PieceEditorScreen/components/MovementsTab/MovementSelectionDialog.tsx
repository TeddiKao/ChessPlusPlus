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
import { IconCheck, IconSearch, IconX } from "@tabler/icons-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";
import type { RegularMove } from "@/features/variants/common/types/pieceRules";

function MovementSelectionDialog() {
	const {
		isMovementSelectionDialogOpen,
		openMovementSelectionDialog,
		closeMovementSelectionDialog,
		searchQuery,
		updateSearchQuery,
		clearSearchQuery,
		pieceName,
	} = useMovementSelectionDialogStore();

	const { movementRulesDraft, pieceRulesetDraft, updatePieceRulesetDraft } =
		useVariantDraftStore();

	if (!movementRulesDraft) return null;
	if (!pieceRulesetDraft) return null;
	if (!pieceName) return null;

	const pieceRuleset = pieceRulesetDraft[pieceName];
	const pieceMoveset = pieceRuleset.moveset;
	const regularMoves = pieceMoveset.filter((move) => !Array.isArray(move));

	function handleClearSearchQueryButtonClick() {
		clearSearchQuery();
	}

	function handleSearchQueryInputChange(
		e: React.ChangeEvent<HTMLInputElement>,
	) {
		updateSearchQuery(e.target.value);
	}

	function handleMovementClick(movementName: string) {
		if (!pieceRulesetDraft) return;
		if (!pieceName) return;

		const updatedPieceRulesetDraft = structuredClone(pieceRulesetDraft);

		if (
			updatedPieceRulesetDraft[pieceName].moveset
				.filter((move) => !Array.isArray(move))
				.some((move) => (move as RegularMove).moveName === movementName)
		) {
			updatedPieceRulesetDraft[pieceName].moveset =
				updatedPieceRulesetDraft[pieceName].moveset.filter(
					(move) => (move as RegularMove).moveName !== movementName,
				);
		} else {
			updatedPieceRulesetDraft[pieceName].moveset.push({
				moveName: movementName,
			});
		}
		updatePieceRulesetDraft(updatedPieceRulesetDraft);
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
			<DialogContent className="h-[90vh] flex flex-col">
				<DialogHeader>
					<DialogTitle>Select movements</DialogTitle>
					<DialogDescription>
						Select the movements you want to add to the piece.
						Changes are saved automatically.
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
											regularMoves.some(
												(move) =>
													(move as RegularMove)
														.moveName ===
													movementName,
											)
												? "bg-sidebar-primary-foreground hover:bg-(--sidebar-primary-hover)"
												: "hover:bg-muted",
										)}
									>
										<div className="flex flex-col gap-1">
											<p>{movementName}</p>
											<p className="text-muted-foreground">
												{
													regularMoves.filter(
														(move) =>
															(
																move as RegularMove
															).moveName ===
															movementName,
													).length
												}{" "}
												
												{regularMoves.filter(
													(move) =>
														(move as RegularMove)
															.moveName ===
															movementName,
													).length === 1
														? "usage"
														: "usages"
												}
											</p>
										</div>

										{regularMoves.some(
											(move) =>
												(move as RegularMove)
													.moveName === movementName,
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

export default MovementSelectionDialog;
