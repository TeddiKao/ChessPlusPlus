import { Button } from "@/components/ui/button";
import {
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { RegularMove } from "@/features/variants/common/types/pieceRules";
import usePiecesEditorStore from "@/features/variants/variantEditor/stores/piecesEditor";
import usePiecesEditorSheetStore from "@/features/variants/variantEditor/stores/piecesEditorSheet";
import useVariantDraftStore from "@/features/variants/variantEditor/stores/variantDraft";
import { IconChevronLeft } from "@tabler/icons-react";
import { useEffect } from "react";
import { AppearanceTab } from "@/features/variants/variantEditor/components/PiecesEditorSheet/components/PieceEditorScreen/components/AppearanceTab";
import { MovementsTab } from "@/features/variants/variantEditor/components/PiecesEditorSheet/components/PieceEditorScreen/components/MovementsTab";

function PieceEditorScreen() {
	const { updateCurrentMode } = usePiecesEditorSheetStore();
	const { pieceRulesetDraft } = useVariantDraftStore();
	const {
		activePiece,
		pieceName,
		updatePieceName,
		updateMovementsInActivePiece,
	} = usePiecesEditorStore();

	useEffect(() => {
		if (!pieceRulesetDraft) return;
		if (!activePiece) return;

		const activePieceInfo = pieceRulesetDraft[activePiece];
		if (!activePieceInfo) return;

		const activePieceMovements = activePieceInfo.moveset;

		const regularMoves = activePieceMovements.filter(
			(move) => !Array.isArray(move),
		);

		updateMovementsInActivePiece(regularMoves as RegularMove[]);
		updatePieceName(activePiece);
	}, [
		pieceRulesetDraft,
		activePiece,
		updateMovementsInActivePiece,
		updatePieceName,
	]);

	if (!activePiece) return null;
	if (!pieceName) return null;

	function handleBackClick() {
		updateCurrentMode("pieceSelection");
	}

	return (
		<>
			<SheetHeader>
				<div className="flex flex-row gap-2 items-center">
					<Button
						className="p-0 hover:bg-(--sidebar-primary-hover)"
						variant="ghost"
						onClick={handleBackClick}
					>
						<IconChevronLeft className="size-5" />
					</Button>

					<SheetTitle>Piece editor</SheetTitle>
				</div>

				<SheetDescription>
					You are currently editing the {activePiece}. Click on the
					back arrow to change your selection.
				</SheetDescription>
			</SheetHeader>

			<Tabs defaultValue="appearance" className="px-4">
				<TabsList variant="line">
					<TabsTrigger value="appearance">Appearance</TabsTrigger>
					<TabsTrigger value="movements">Movements</TabsTrigger>
				</TabsList>

				<AppearanceTab />
				<MovementsTab />
			</Tabs>

			<SheetFooter>
				<Button>Add movement</Button>
				<Button variant="destructive">Delete piece</Button>
			</SheetFooter>
		</>
	);
}

export default PieceEditorScreen;
