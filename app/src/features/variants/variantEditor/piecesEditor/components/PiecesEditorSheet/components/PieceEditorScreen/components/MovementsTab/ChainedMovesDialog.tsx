import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import AddChainedMoveDialog from "@/features/variants/variantEditor/piecesEditor/components/PiecesEditorSheet/components/PieceEditorScreen/components/MovementsTab/AddChainedMoveDialog";
import useAddChainedMoveDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/addChainedMoveDialog";
import useChainedMovesDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/chainedMovesDialog";
import usePiecesEditorStore from "@/features/variants/variantEditor/piecesEditor/stores/piecesEditor";
import { IconArrowRight, IconPlus } from "@tabler/icons-react";
import { Fragment } from "react/jsx-runtime";

function ChainedMovesDialog() {
	const {
		isChainedMovesDialogOpen,
		openChainedMovesDialog,
		closeChainedMovesDialog,
		clearActivePiece,
	} = useChainedMovesDialogStore();
	const { chainedMoveSequences } = usePiecesEditorStore();

	const { openChainedMoveDialog, updateChainedMoveSequenceIndex } =
		useAddChainedMoveDialogStore();

	function handleAddChainedMoveButtonClick(chainedMoveSequenceIndex: number) {
		updateChainedMoveSequenceIndex(chainedMoveSequenceIndex);
		openChainedMoveDialog();
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
						clearActivePiece();
					}
				}}
			>
				<DialogContent className="min-w-[50vw]">
					<DialogHeader>
						<DialogTitle>Chained moves</DialogTitle>
						<DialogDescription>
							View and modify chained move sequences
						</DialogDescription>
					</DialogHeader>

					<div className="flex flex-col gap-2">
						{chainedMoveSequences.map((sequence, index) => (
							<Fragment key={index}>
								<div className="flex flex-row items-center gap-4">
									<div className="flex flex-row items-center justify-between p-4 rounded-lg border-muted-foreground border-2 border-dashed">
										<div className="flex flex-row items-center">
											{sequence.map((node, nodeIndex) => {
												return (
													<div
														key={nodeIndex}
														className="flex flex-row items-center"
													>
														<p className="px-4 py-2 rounded-md bg-muted">
															{node.moveName}
														</p>

														{nodeIndex <
															sequence.length -
																1 && (
															<IconArrowRight />
														)}
													</div>
												);
											})}
										</div>
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
							</Fragment>
						))}
					</div>
				</DialogContent>
			</Dialog>

			<AddChainedMoveDialog />
		</>
	);
}

export default ChainedMovesDialog;
