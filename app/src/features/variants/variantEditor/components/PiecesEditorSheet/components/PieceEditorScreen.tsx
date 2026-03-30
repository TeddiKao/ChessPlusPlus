import { Button } from "@/components/ui/button";
import {
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import usePiecesEditorStore from "@/features/variants/variantEditor/stores/piecesEditor";
import usePiecesEditorSheetStore from "@/features/variants/variantEditor/stores/piecesEditorSheet";
import { IconChevronLeft } from "@tabler/icons-react";

function PieceEditorScreen() {
	const { updateCurrentMode } = usePiecesEditorSheetStore();
	const { activePiece } = usePiecesEditorStore();

	if (!activePiece) return null;

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
			</Tabs>
			
			<SheetFooter>
				<Button variant="destructive">Delete piece</Button>
			</SheetFooter>
		</>
	);
}

export default PieceEditorScreen;
