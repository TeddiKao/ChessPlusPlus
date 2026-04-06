import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type {
	ChainedMoveNode,
	ChainedMoveSequence,
} from "@/features/variants/common/types/pieceRules";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import AddChainedMoveDialog from "@/features/variants/variantEditor/piecesEditor/components/PiecesEditorSheet/components/PieceEditorScreen/components/MovementsTab/components/AddChainedMoveDialog";
import ChainedMoveSequenceCreationDialog from "@/features/variants/variantEditor/piecesEditor/components/PiecesEditorSheet/components/PieceEditorScreen/components/MovementsTab/components/ChainedMoveSequenceCreationDialog";
import EditChainedMoveDialog from "@/features/variants/variantEditor/piecesEditor/components/PiecesEditorSheet/components/PieceEditorScreen/components/MovementsTab/components/EditChainedMoveDialog";
import useAddChainedMoveDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/addChainedMoveDialog";
import useChainedMovesDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/chainedMovesDialog";
import useChainedMoveSequenceCreationDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/chainedMoveSequenceCreationDialog";
import useEditChainedMoveDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/editChainedMoveDialog";
import usePiecesEditorStore from "@/features/variants/variantEditor/piecesEditor/stores/piecesEditor";
import { isNullOrUndefined } from "@/shared/utils/typeChecks";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";

import { type MouseEvent } from "react";

type SequenceNodeCardProps = {
	chainedMoveNode: ChainedMoveNode;
	sequenceIndex: number;
	nodeIndex: number;
	sequenceIndexInMoveset: number | null;
	sequenceLength: number;
};

type ChainedMoveSequenceCardProps = {
	sequence: ChainedMoveSequence;
	sequenceIndex: number;
	indexInMoveset: number | null;
};

function SequenceNodeCard({
	chainedMoveNode,
	sequenceIndex,
	nodeIndex,
	sequenceIndexInMoveset,
	sequenceLength,
}: SequenceNodeCardProps) {
	const {
		chainedMoveSequences,
		removeChainedMoveSequence,
		removeChainedMoveFromSequence,
		removeChainedMovesFromSequence,
		addDeletedChainedMoveSequence,
		addChainedMoveToSequence,
	} = usePiecesEditorStore();

	const {
		openChainedMoveDialog,
		updateChainedMoveSequenceIndex,
		updateAdditionalInfo,
		updateOnAddChainedMove,
	} = useAddChainedMoveDialogStore();

	const { openEditChainedMoveDialog, updateSequenceIndex, updateNodeIndex, updateNewMovementName } = useEditChainedMoveDialogStore();

	function handleDeleteSequenceButtonClick(e: MouseEvent<HTMLDivElement>) {
		e.stopPropagation();
		removeChainedMoveSequence(sequenceIndex);

		if (isNullOrUndefined(sequenceIndexInMoveset)) return;

		addDeletedChainedMoveSequence([
			sequenceIndexInMoveset,
			chainedMoveSequences[sequenceIndex][1],
		]);
	}

	function handleDeleteThisMoveButtonClick(e: MouseEvent<HTMLDivElement>) {
		e.stopPropagation();

		removeChainedMoveFromSequence(sequenceIndex, nodeIndex);

		if (sequenceLength === 1) {
			removeChainedMoveSequence(sequenceIndex);
			addDeletedChainedMoveSequence([
				sequenceIndexInMoveset,
				chainedMoveSequences[sequenceIndex][1],
			]);
		}
	}

	function handleDeleteMovesBeforeButtonClick(e: MouseEvent<HTMLDivElement>) {
		e.stopPropagation();

		removeChainedMovesFromSequence(
			sequenceIndex,
			Array.from({ length: nodeIndex }, (_, index) => index),
		);
	}

	function handleDeleteMovesAfterButtonClick(e: MouseEvent<HTMLDivElement>) {
		e.stopPropagation();

		removeChainedMovesFromSequence(
			sequenceIndex,
			Array.from(
				{ length: sequenceLength - nodeIndex },
				(_, index) => index + nodeIndex + 1,
			),
		);
	}

	function handleAddMoveBeforeButtonClick(e: MouseEvent<HTMLDivElement>) {
		e.stopPropagation();

		updateAdditionalInfo({
			sequenceIndex,
			nodeIndex,
		});

		updateOnAddChainedMove((movementToAdd, additionalInfo) => {
			const { sequenceIndex, nodeIndex } = additionalInfo as {
				sequenceIndex: number;
				nodeIndex: number;
			};

			addChainedMoveToSequence(sequenceIndex, nodeIndex, {
				moveName: movementToAdd,
				validMove: true,
			});
		});

		updateChainedMoveSequenceIndex(sequenceIndex);

		openChainedMoveDialog();
	}

	function handleAddMoveAfterButtonClick(e: MouseEvent<HTMLDivElement>) {
		e.stopPropagation();

		updateAdditionalInfo({
			sequenceIndex,
			nodeIndex,
		});

		updateOnAddChainedMove((movementToAdd, additionalInfo) => {
			const { sequenceIndex, nodeIndex } = additionalInfo as {
				sequenceIndex: number;
				nodeIndex: number;
			};

			addChainedMoveToSequence(sequenceIndex, nodeIndex + 1, {
				moveName: movementToAdd,
				validMove: true,
			});
		});

		updateChainedMoveSequenceIndex(sequenceIndex);

		openChainedMoveDialog();
	}

	function handleEditChainedMoveButtonClick(e: MouseEvent<HTMLDivElement>) {
		e.stopPropagation();

		openEditChainedMoveDialog();
		updateSequenceIndex(sequenceIndex);
		updateNodeIndex(nodeIndex);
		updateNewMovementName(chainedMoveNode.moveName);
	}

	return (
		<div className="flex flex-row items-center w-full">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="px-4 py-2 rounded-md bg-muted w-full"
					>
						{chainedMoveNode.moveName}
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-max" side="bottom">
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<IconPlus />
							Add
						</DropdownMenuSubTrigger>

						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem
									onClick={handleAddMoveBeforeButtonClick}
								>
									<IconPlus />
									Add move before
								</DropdownMenuItem>

								<DropdownMenuItem
									onClick={handleAddMoveAfterButtonClick}
								>
									<IconPlus />
									Add move after
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>

					<DropdownMenuItem onClick={handleEditChainedMoveButtonClick}>
						<IconPencil />
						Edit
					</DropdownMenuItem>

					<DropdownMenuSub>
						<DropdownMenuSubTrigger variant="destructive">
							<IconTrash />
							Delete
						</DropdownMenuSubTrigger>

						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem
									onClick={handleDeleteThisMoveButtonClick}
									variant="destructive"
								>
									<IconTrash />
									Delete this move
								</DropdownMenuItem>

								{nodeIndex > 0 && (
									<DropdownMenuItem
										onClick={
											handleDeleteMovesBeforeButtonClick
										}
										variant="destructive"
									>
										<IconTrash />
										Delete moves before
									</DropdownMenuItem>
								)}

								{nodeIndex < sequenceLength - 1 && (
									<DropdownMenuItem
										onClick={
											handleDeleteMovesAfterButtonClick
										}
										variant="destructive"
									>
										<IconTrash />
										Delete moves after
									</DropdownMenuItem>
								)}

								<DropdownMenuItem
									onClick={handleDeleteSequenceButtonClick}
									variant="destructive"
								>
									<IconTrash />
									Delete sequence
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

function ChainedMoveSequenceCard({
	sequence,
	sequenceIndex,
	indexInMoveset,
}: ChainedMoveSequenceCardProps) {
	return (
		<ScrollArea className="flex-1 min-w-0 overflow-x-auto">
			<div className="w-full">
				<div className="flex min-w-max w-full flex-col gap-2 p-4">
					{sequence.map((node, nodeIndex) => {
						return (
							<div
								key={nodeIndex}
								className="flex flex-col w-full"
							>
								<SequenceNodeCard
									chainedMoveNode={node}
									sequenceIndex={sequenceIndex}
									sequenceIndexInMoveset={indexInMoveset}
									nodeIndex={nodeIndex}
									sequenceLength={sequence.length}
								/>
							</div>
						);
					})}
				</div>
			</div>

			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}

function ChainedMovesDialog() {
	const {
		isChainedMovesDialogOpen,
		openChainedMovesDialog,
		closeChainedMovesDialog,
		activePiece,
		clearActivePiece,
	} = useChainedMovesDialogStore();
	const {
		chainedMoveSequences,
		deletedChainedMoveSequences,
		addChainedMoveToSequence,
	} = usePiecesEditorStore();
	const {
		pieceRulesetDraft,
		updatePieceRulesetDraft,
		syncPieceRulesetDraftToDB,
	} = useVariantDraftStore();

	const {
		openChainedMoveDialog,
		updateChainedMoveSequenceIndex,
		updateAdditionalInfo,
		updateOnAddChainedMove,
	} = useAddChainedMoveDialogStore();
	const { openChainedMoveSequenceCreationDialog } =
		useChainedMoveSequenceCreationDialogStore();

	function handleAddChainedMoveButtonClick(chainedMoveSequenceIndex: number) {
		updateChainedMoveSequenceIndex(chainedMoveSequenceIndex);
		updateAdditionalInfo({
			chainedMoveSequenceIndex,
		});

		updateOnAddChainedMove((movementToAdd, additionalInfo) => {
			const additionalInfoData = additionalInfo as {
				chainedMoveSequenceIndex: number;
			};

			addChainedMoveToSequence(
				additionalInfoData.chainedMoveSequenceIndex,
				"end",
				{
					moveName: movementToAdd,
					validMove: true,
				},
			);
		});

		openChainedMoveDialog();
	}

	function saveChainedMoveSequences() {
		if (!pieceRulesetDraft) return;
		if (!activePiece) return;

		const updatedPieceRulesetDraft = structuredClone(pieceRulesetDraft);

		chainedMoveSequences.forEach((sequence) => {
			const indexToUpdate = sequence[0];
			if (isNullOrUndefined(indexToUpdate)) {
				updatedPieceRulesetDraft[activePiece].moveset.push(sequence[1]);
			} else {
				updatedPieceRulesetDraft[activePiece].moveset[indexToUpdate] =
					sequence[1];
			}
		});

		deletedChainedMoveSequences.forEach((sequence) => {
			const indexToUpdate = sequence[0];
			if (isNullOrUndefined(indexToUpdate)) {
				return;
			}

			updatedPieceRulesetDraft[activePiece].moveset =
				updatedPieceRulesetDraft[activePiece].moveset.filter(
					(_, index) => index !== indexToUpdate,
				);
		});

		updatePieceRulesetDraft(updatedPieceRulesetDraft);
		syncPieceRulesetDraftToDB();
	}

	function handleAddSequenceButtonClick() {
		openChainedMoveSequenceCreationDialog();
	}

	return (
		<>
			<Dialog
				open={isChainedMovesDialogOpen}
				onOpenChange={(open) => {
					if (open) {
						openChainedMovesDialog();
					} else {
						closeChainedMovesDialog();
						saveChainedMoveSequences();
						clearActivePiece();
					}
				}}
			>
				<DialogContent className="min-w-[50vw] w-[50vw] h-[90vh] flex flex-col">
					<DialogHeader>
						<DialogTitle>Chained moves</DialogTitle>
						<DialogDescription>
							View and modify chained move sequences
						</DialogDescription>
					</DialogHeader>

					<ScrollArea className="min-h-0 flex-1 p-4">
						<div className="flex flex-col gap-4">
							<div className="flex flex-1 flex-col gap-4 w-full">
								{chainedMoveSequences.map((sequence, index) => (
									<div
										key={index}
										className="flex min-w-0 flex-row items-center gap-4 w-full"
									>
										<div className="flex min-w-0 flex-1 flex-row items-center rounded-lg border-2 border-dashed border-muted-foreground w-0">
											<ChainedMoveSequenceCard
												sequence={sequence[1]}
												sequenceIndex={index}
												indexInMoveset={sequence[0]}
											/>
										</div>

										<Button
											onClick={() =>
												handleAddChainedMoveButtonClick(
													index,
												)
											}
											variant="outline"
											size="icon-sm"
										>
											<IconPlus />
										</Button>
									</div>
								))}
							</div>

							<Button
								onClick={handleAddSequenceButtonClick}
								className="w-full"
							>
								Add sequence
							</Button>
						</div>
					</ScrollArea>
				</DialogContent>
			</Dialog>

			<AddChainedMoveDialog />
			<ChainedMoveSequenceCreationDialog />
			<EditChainedMoveDialog />
		</>
	);
}

export default ChainedMovesDialog;
