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
import useAddChainedMoveDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/addChainedMoveDialog";
import useChainedMovesDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/chainedMovesDialog";
import useChainedMoveSequenceCreationDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/chainedMoveSequenceCreationDialog";
import usePiecesEditorStore from "@/features/variants/variantEditor/piecesEditor/stores/piecesEditor";
import { isNullOrUndefined } from "@/shared/utils/typeChecks";
import { IconArrowRight, IconPlus, IconTrash } from "@tabler/icons-react";

import { type MouseEvent } from "react";

type SequenceNodeCardProps = {
	chainedMoveNode: ChainedMoveNode;
	sequenceIndex: number;
	indexInMoveset: number | null;
};

type ChainedMoveSequenceCardProps = {
	sequence: ChainedMoveSequence;
	sequenceIndex: number;
	indexInMoveset: number | null;
};

function SequenceNodeCard({
	chainedMoveNode,
	sequenceIndex,
	indexInMoveset,
}: SequenceNodeCardProps) {
	const { chainedMoveSequences, removeChainedMoveSequence, addDeletedChainedMoveSequence } = usePiecesEditorStore();

	function handleDeleteSequenceButtonClick(e: MouseEvent<HTMLDivElement>) {
		e.stopPropagation();
		removeChainedMoveSequence(sequenceIndex);

		if (isNullOrUndefined(indexInMoveset)) return;

		addDeletedChainedMoveSequence([indexInMoveset, chainedMoveSequences[sequenceIndex][1]]);
	}

	return (
		<div className="flex flex-row items-center">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="px-4 py-2 rounded-md bg-muted"
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
								<DropdownMenuItem>
									<IconPlus />
									Add move before
								</DropdownMenuItem>

								<DropdownMenuItem>
									<IconPlus />
									Add move after
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>

					<DropdownMenuSub>
						<DropdownMenuSubTrigger variant="destructive">
							<IconTrash />
							Delete
						</DropdownMenuSubTrigger>

						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem variant="destructive">
									<IconTrash />
									Delete this move
								</DropdownMenuItem>
								<DropdownMenuItem variant="destructive">
									<IconTrash />
									Delete moves before
								</DropdownMenuItem>

								<DropdownMenuItem variant="destructive">
									<IconTrash />
									Delete moves after
								</DropdownMenuItem>

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
		<ScrollArea className="min-w-0 w-full">
			<div className="flex min-w-0 flex-row items-center p-4">
				{sequence.map((node, nodeIndex) => {
					return (
						<div
							key={nodeIndex}
							className="flex flex-row items-center"
						>
							<SequenceNodeCard
								chainedMoveNode={node}
								sequenceIndex={sequenceIndex}
								indexInMoveset={indexInMoveset}
							/>

							{nodeIndex < sequence.length - 1 && (
								<IconArrowRight />
							)}
						</div>
					);
				})}
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
	const { chainedMoveSequences } = usePiecesEditorStore();
	const {
		pieceRulesetDraft,
		updatePieceRulesetDraft,
		syncPieceRulesetDraftToDB,
	} = useVariantDraftStore();

	const { openChainedMoveDialog, updateChainedMoveSequenceIndex } =
		useAddChainedMoveDialogStore();
	const { openChainedMoveSequenceCreationDialog } =
		useChainedMoveSequenceCreationDialogStore();

	function handleAddChainedMoveButtonClick(chainedMoveSequenceIndex: number) {
		updateChainedMoveSequenceIndex(chainedMoveSequenceIndex);
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
				<DialogContent className="min-w-[50vw] w-[50vw]">
					<DialogHeader>
						<DialogTitle>Chained moves</DialogTitle>
						<DialogDescription>
							View and modify chained move sequences
						</DialogDescription>
					</DialogHeader>

					<div className="flex min-w-0 flex-col gap-4 w-full">
						{chainedMoveSequences.map((sequence, index) => (
							<div
								key={index}
								className="flex min-w-0 flex-row items-center gap-4 w-full"
							>
								<div className="flex min-w-0 flex-1 flex-row items-center justify-between rounded-lg border-2 border-dashed border-muted-foreground">
									<ChainedMoveSequenceCard
										sequence={sequence[1]}
										sequenceIndex={index}
										indexInMoveset={sequence[0]}
									/>
								</div>

								<Button
									onClick={() =>
										handleAddChainedMoveButtonClick(index)
									}
									variant="outline"
									size="icon-sm"
								>
									<IconPlus />
								</Button>
							</div>
						))}

						<Button
							onClick={handleAddSequenceButtonClick}
							className="w-full"
						>
							Add sequence
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			<AddChainedMoveDialog />
			<ChainedMoveSequenceCreationDialog />
		</>
	);
}

export default ChainedMovesDialog;
