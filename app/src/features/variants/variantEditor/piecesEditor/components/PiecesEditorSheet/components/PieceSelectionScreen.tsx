import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import {
	SheetClose,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import usePiecesEditorSheetStore from "@/features/variants/variantEditor/piecesEditor/stores/piecesEditorSheet";
import usePiecesEditorStore from "@/features/variants/variantEditor/piecesEditor/stores/piecesEditor";
import PieceCreationDialog from "@/features/variants/variantEditor/piecesEditor/components/PiecesEditorSheet/components/PieceCreationDialog";
import usePieceCreationDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/pieceCreationDialog";

export function PieceSelectionScreen() {
	const { pieceRulesetDraft } = useVariantDraftStore();
	const { updateCurrentMode } = usePiecesEditorSheetStore();
	const { updateActivePiece } = usePiecesEditorStore();
	const { openPieceCreationDialog } = usePieceCreationDialogStore();

	if (!pieceRulesetDraft) return null;

	function handlePieceClick(pieceName: string) {
		updateActivePiece(pieceName);
		updateCurrentMode("pieceEditing");
	}

	return (
		<>
			<>
				<SheetHeader>
					<SheetTitle>Pieces Editor</SheetTitle>
					<SheetDescription>
						Edit the pieces in this variant.
					</SheetDescription>
				</SheetHeader>

				<div className="flex flex-col px-3">
					{Object.keys(pieceRulesetDraft).map((piece) => (
						<Button
							className="p-0 px-1 justify-start hover:bg-(--sidebar-primary-hover)"
							variant="ghost"
							key={piece}
							onClick={() => handlePieceClick(piece)}
						>
							{piece}
						</Button>
					))}
				</div>

				<SheetFooter>
					<Button onClick={openPieceCreationDialog}>Create piece</Button>
					<SheetClose asChild>
						<Button variant="outline">Close</Button>
					</SheetClose>
				</SheetFooter>
			</>

			<PieceCreationDialog />
		</>
	);
}
