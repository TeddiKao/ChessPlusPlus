import usePieceSelectionScreenStore from "@/features/variants/variantEditor/pieces/stores/pieceSelectionScreen";
import {
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { pieceIconMap } from "@/features/variants/variantEditor/pieces/constants/pieceIconMap";

function PiecesSelectionScreen() {
	const {
		isDefaultPiecesExpanded,
		expandDefaultPieces,
		collapseDefaultPieces,
		isCustomPiecesExpanded,
		expandCustomPieces,
		collapseCustomPieces,
	} = usePieceSelectionScreenStore();

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Pieces</SheetTitle>
				<SheetDescription>
					Click on a piece to edit it, or add a new piece
				</SheetDescription>
			</SheetHeader>

			<div className="flex flex-col">
				<Collapsible>
					<CollapsibleTrigger asChild>
						<Button
							onClick={
								isDefaultPiecesExpanded
									? collapseDefaultPieces
									: expandDefaultPieces
							}
							variant="ghost"
							className="flex flex-row justify-between w-full"
						>
							<span>Default (8)</span>
							{isDefaultPiecesExpanded ? (
								<IconChevronDown />
							) : (
								<IconChevronUp />
							)}
						</Button>
					</CollapsibleTrigger>

					<CollapsibleContent>
						{Array.from(pieceIconMap.entries()).map(
							([piece, Icon]) => (
								<div className="flex flex-row gap-2">
									<Button variant="ghost">
										<Icon className="size-5" />
										<span>{piece}</span>
									</Button>
								</div>
							),
						)}
					</CollapsibleContent>
				</Collapsible>

				<Collapsible>
					<CollapsibleTrigger asChild>
						<Button
							onClick={
								isCustomPiecesExpanded
									? collapseCustomPieces
									: expandCustomPieces
							}
							variant="ghost"
							className="flex flex-row justify-between w-full"
						>
							<span>Custom (0)</span>
							{isCustomPiecesExpanded ? (
								<IconChevronDown />
							) : (
								<IconChevronUp />
							)}
						</Button>
					</CollapsibleTrigger>
				</Collapsible>
			</div>

			<SheetFooter>
				<Button>Add piece</Button>
				<SheetClose asChild>
					<Button variant="outline">Close</Button>
				</SheetClose>
			</SheetFooter>
		</SheetContent>
	);
}

export default PiecesSelectionScreen;
