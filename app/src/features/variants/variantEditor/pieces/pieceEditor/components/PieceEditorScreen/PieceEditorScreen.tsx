import {
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { IconChevronLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import usePieceSettingsStore from "@/features/variants/variantEditor/pieces/common/stores/pieceSettingsSheet";
import usePieceEditorStore from "@/features/variants/variantEditor/pieces/pieceEditor/stores/pieceEditor";
import MovementsTab from "@/features/variants/variantEditor/pieces/pieceEditor/components/PieceEditorScreen/components/MovementsTab/MovementsTab";
import AppearanceTab from "@/features/variants/variantEditor/pieces/pieceEditor/components/PieceEditorScreen/components/AppearanceTab";

function PieceEditorScreen() {
	const { updateCurrentSheetMode } = usePieceSettingsStore();
	const { currentPiece, clearCurrentPiece } = usePieceEditorStore();

	function handleBackClick() {
		clearCurrentPiece();
		updateCurrentSheetMode("pieceSelection");
	}

	return (
		<>
			<SheetHeader>
				<SheetTitle className="flex flex-row items-center gap-2">
					<Button onClick={handleBackClick} variant="ghost">
						<IconChevronLeft className="size-5" />
					</Button>
					<span>Piece Editor</span>
				</SheetTitle>
				<SheetDescription>
					{currentPiece ? (
						<span>
							You are currently editing the {currentPiece}. Click
							the back arrow to switch your selection.
						</span>
					) : (
						<span>Select a piece to edit.</span>
					)}
				</SheetDescription>
			</SheetHeader>

			<Tabs defaultValue="appearance" className="overflow-y-auto">
				<TabsList variant="line">
					<TabsTrigger value="appearance">Appearance</TabsTrigger>
					<TabsTrigger value="movements">Movements</TabsTrigger>
				</TabsList>

				<AppearanceTab />
				<MovementsTab />
			</Tabs>
		</>
	);
}

export default PieceEditorScreen;
