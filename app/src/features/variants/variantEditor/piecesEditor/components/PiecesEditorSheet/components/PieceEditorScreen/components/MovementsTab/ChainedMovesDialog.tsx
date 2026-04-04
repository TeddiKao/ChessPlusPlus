import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import AddChainedMoveDialog from "@/features/variants/variantEditor/piecesEditor/components/PiecesEditorSheet/components/PieceEditorScreen/components/MovementsTab/AddChainedMoveDialog";
import useAddChainedMoveDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/addChainedMoveDialog";
import useChainedMovesDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/chainedMovesDialog";
import usePiecesEditorStore from "@/features/variants/variantEditor/piecesEditor/stores/piecesEditor";
import { isNullOrUndefined } from "@/shared/utils/typeChecks";
import { IconArrowRight, IconPlus } from "@tabler/icons-react";

function ChainedMovesDialog() {
	const {
		isChainedMovesDialogOpen,
		openChainedMovesDialog,
		closeChainedMovesDialog,
		activePiece,
		clearActivePiece
	} = useChainedMovesDialogStore();
	const { chainedMoveSequences } = usePiecesEditorStore();
	const { pieceRulesetDraft, updatePieceRulesetDraft, syncPieceRulesetDraftToDB } =
		useVariantDraftStore();

	const { openChainedMoveDialog, updateChainedMoveSequenceIndex } =
		useAddChainedMoveDialogStore();

	function handleAddChainedMoveButtonClick(chainedMoveSequenceIndex: number) {
		updateChainedMoveSequenceIndex(chainedMoveSequenceIndex);
		openChainedMoveDialog();
	}

	function saveChainedMoveSequences() {
		if (!pieceRulesetDraft) return;
		if (!activePiece) return;

		const updatedPieceRulesetDraft = structuredClone(pieceRulesetDraft);;

		chainedMoveSequences.forEach((sequence) => {
			const indexToUpdate = sequence[0];
			if (isNullOrUndefined(indexToUpdate)) {
				updatedPieceRulesetDraft[activePiece].moveset.push(sequence[1]);
			} else {
				updatedPieceRulesetDraft[activePiece].moveset[indexToUpdate] = sequence[1];
			}
		});

		updatePieceRulesetDraft(updatedPieceRulesetDraft);
		syncPieceRulesetDraftToDB();
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

					<div className="flex min-w-0 flex-col gap-2 w-full">
						{chainedMoveSequences.map((sequence, index) => (
							<div
								key={index}
								className="flex min-w-0 flex-row items-center gap-4 w-full"
							>
								<div className="flex min-w-0 flex-1 flex-row items-center justify-between rounded-lg border-2 border-dashed border-muted-foreground">
									<ScrollArea className="min-w-0 w-full">
										<div className="flex min-w-0 flex-row items-center p-4">
											{sequence[1].map((node, nodeIndex) => {
												return (
													<div
														key={nodeIndex}
														className="flex flex-row items-center"
													>
														<Button
															variant="ghost"
															className="px-4 py-2 rounded-md bg-muted"
														>
															{node.moveName}
														</Button>

														{nodeIndex <
															sequence[1].length -
																1 && (
															<IconArrowRight />
														)}
													</div>
												);
											})}
										</div>

										<ScrollBar orientation="horizontal" />
									</ScrollArea>
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

						<Button className="w-full">Add sequence</Button>
					</div>
				</DialogContent>
			</Dialog>

			<AddChainedMoveDialog />
		</>
	);
}

export default ChainedMovesDialog;
