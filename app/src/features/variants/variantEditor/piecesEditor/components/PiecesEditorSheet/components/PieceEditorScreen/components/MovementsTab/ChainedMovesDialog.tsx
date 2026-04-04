import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import useChainedMovesDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/chainedMovesDialog";
import usePiecesEditorStore from "@/features/variants/variantEditor/piecesEditor/stores/piecesEditor";
import { IconArrowRight, IconPlus } from "@tabler/icons-react";

function ChainedMovesDialog() {
	const {
		isChainedMovesDialogOpen,
		openChainedMovesDialog,
		closeChainedMovesDialog,
		clearActivePiece,
	} = useChainedMovesDialogStore();
	const { chainedMoveSequences } = usePiecesEditorStore();

	return (
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
						<div
							className="flex flex-row items-center justify-between p-4 rounded-lg border-muted-foreground border-2 border-dashed"
							key={index}
						>
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
												sequence.length - 1 && (
												<IconArrowRight />
											)}
										</div>
									);
								})}
							</div>

							<Button variant="outline" size="icon-sm">
								<IconPlus />
							</Button>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ChainedMovesDialog;
