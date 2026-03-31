import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import {
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import usePiecesEditorSheetStore from "@/features/variants/variantEditor/piecesEditor/stores/piecesEditorSheet";
import usePiecesEditorStore from "@/features/variants/variantEditor/piecesEditor/stores/piecesEditor";

export function PieceSelectionScreen() {
	const { pieceRulesetDraft } = useVariantDraftStore();
	const { updateCurrentMode } = usePiecesEditorSheetStore();
	const { updateActivePiece } = usePiecesEditorStore();

	if (!pieceRulesetDraft) return null;

	function handlePieceClick(pieceName: string) {
		updateActivePiece(pieceName);
		updateCurrentMode("pieceEditing");
	}

	return (
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
				<Button>Create piece</Button>
				<Button variant="outline">Close</Button>
			</SheetFooter>
		</>
	);
}
