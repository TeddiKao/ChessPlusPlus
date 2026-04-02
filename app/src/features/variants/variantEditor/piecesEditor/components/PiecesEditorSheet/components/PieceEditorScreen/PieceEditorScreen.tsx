import { Button } from "@/components/ui/button";
import {
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { RegularMove } from "@/features/variants/common/types/pieceRules";
import usePiecesEditorStore from "@/features/variants/variantEditor/piecesEditor/stores/piecesEditor";
import usePiecesEditorSheetStore from "@/features/variants/variantEditor/piecesEditor/stores/piecesEditorSheet";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import { IconChevronLeft } from "@tabler/icons-react";
import { useEffect } from "react";
import { AppearanceTab } from "@/features/variants/variantEditor/piecesEditor/components/PiecesEditorSheet/components/PieceEditorScreen/components/AppearanceTab";
import { MovementsTab } from "@/features/variants/variantEditor/piecesEditor/components/PiecesEditorSheet/components/PieceEditorScreen/components/MovementsTab";
import PieceDeletionAlert from "@/features/variants/variantEditor/piecesEditor/components/PiecesEditorSheet/components/PieceDeletionAlert";
import usePieceDeletionAlertStore from "@/features/variants/variantEditor/piecesEditor/stores/pieceDeletionAlert";
import usePieceImagesStore from "@/features/variants/common/stores/pieceImages";

function PieceEditorScreen() {
	const { updateCurrentMode } = usePiecesEditorSheetStore();
	const { images, hasHydrated } = usePieceImagesStore();
	const { pieceRulesetDraft } = useVariantDraftStore();
	const {
		activePiece,
		pieceName,
		updatePieceName,
		updateMovementsInActivePiece,
		updatePieceImage,
	} = usePiecesEditorStore();
	
	const { openPieceDeletionAlert, updatePieceToDelete } = usePieceDeletionAlertStore();

	useEffect(() => {
		if (!hasHydrated) return;
		if (!pieceRulesetDraft) return;
		if (!activePiece) return;

		const activePieceInfo = pieceRulesetDraft[activePiece];
		if (!activePieceInfo) return;
	
		const imageId = activePieceInfo.imageId;
		if (!imageId) return;

		const pieceImage = images[imageId];
		if (!pieceImage) return;

		const activePieceMovements = activePieceInfo.moveset;

		const regularMoves = activePieceMovements.filter(
			(move) => !Array.isArray(move),
		);

		updateMovementsInActivePiece(regularMoves as RegularMove[]);
		updatePieceName(activePiece);
		updatePieceImage(pieceImage.image);
	}, [
		images,
		hasHydrated,
		pieceRulesetDraft,
		activePiece,
		updateMovementsInActivePiece,
		updatePieceName,
		updatePieceImage,
	]);

	if (!activePiece) return null;
	if (!pieceName) return null;

	function handleBackClick() {
		updateCurrentMode("pieceSelection");
	}

	return (
		<>
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
						You are currently editing the {activePiece}. Click on
						the back arrow to change your selection.
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
					<Button variant="destructive" onClick={() => {
						openPieceDeletionAlert();
						updatePieceToDelete(activePiece);
					}}>Delete piece</Button>
				</SheetFooter>
			</>

			<PieceDeletionAlert />
		</>
	);
}

export default PieceEditorScreen;
