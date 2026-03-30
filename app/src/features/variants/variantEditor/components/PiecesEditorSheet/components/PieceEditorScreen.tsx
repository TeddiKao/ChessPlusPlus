import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import usePiecesEditorStore from "@/features/variants/variantEditor/stores/piecesEditor";
import usePiecesEditorSheetStore from "@/features/variants/variantEditor/stores/piecesEditorSheet";
import {
	IconChevronDown,
	IconChevronLeft,
	IconChevronUp,
	IconUpload,
} from "@tabler/icons-react";

function PieceEditorScreen() {
	const { updateCurrentMode } = usePiecesEditorSheetStore();
	const {
		activePiece,
		activePieceMovements,
		isMovementsExpanded,
		expandMovements,
		collapseMovements,
	} = usePiecesEditorStore();

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

				<TabsContent className="flex flex-col gap-4" value="appearance">
					<Field className="grid grid-cols-2 gap-4">
						<FieldLabel htmlFor="pieceNameInput">
							Piece name
						</FieldLabel>
						<Input
							id="pieceNameInput"
							type="text"
							placeholder="Piece name"
							className="bg-background"
						/>
					</Field>

					<div className="grid grid-cols-2 gap-4">
						<p>Piece image</p>
						<Button data-icon="inline-start" variant="outline">
							<IconUpload className="size-5" />
							<span>Upload image</span>
						</Button>
					</div>
				</TabsContent>

				<TabsContent value="movements">
					<Collapsible
						open={isMovementsExpanded}
						onOpenChange={(open) => {
							if (open) {
								expandMovements();
							} else {
								collapseMovements();
							}
						}}
					>
						<div className="flex flex-row justify-between">
							<p className="font-semibold">Movements</p>

							<CollapsibleTrigger asChild>
								<Button
									variant="ghost"
									className="p-0 px-1 hover:bg-(--sidebar-primary-hover) hover:aria-expanded:bg-(--sidebar-primary-hover)"
								>
									{isMovementsExpanded ? (
										<IconChevronUp className="size-5" />
									) : (
										<IconChevronDown className="size-5" />
									)}
								</Button>
							</CollapsibleTrigger>
						</div>

						<CollapsibleContent>
							{activePieceMovements.map((movement) => (
								<p key={movement.moveName}>{movement.moveName}</p>
							))}
						</CollapsibleContent>
					</Collapsible>
				</TabsContent>
			</Tabs>

			<SheetFooter>
				<Button variant="destructive">Delete piece</Button>
			</SheetFooter>
		</>
	);
}

export default PieceEditorScreen;
