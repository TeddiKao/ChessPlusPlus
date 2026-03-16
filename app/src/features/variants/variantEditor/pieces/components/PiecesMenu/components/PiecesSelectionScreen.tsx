import usePieceSelectionScreenStore from "@/features/variants/variantEditor/pieces/stores/pieceSelectionScreen";
import {
	SheetClose,
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
import usePieceSettingsStore from "@/features/variants/variantEditor/pieces/stores/pieceSettingsSheet";

function PiecesSelectionScreen() {
	const {
		isDefaultPiecesExpanded,
		expandDefaultPieces,
		collapseDefaultPieces,
		isCustomPiecesExpanded,
		expandCustomPieces,
		collapseCustomPieces,
	} = usePieceSelectionScreenStore();

	const { updateCurrentSheetMode } = usePieceSettingsStore();

	return (
		<>
			<SheetHeader>
				<SheetTitle>Pieces</SheetTitle>
				<SheetDescription>
					Click on a piece to edit it, or add a new piece
				</SheetDescription>
			</SheetHeader>

			<div className="flex flex-col">
				<Collapsible
					open={isDefaultPiecesExpanded}
					onOpenChange={(open) =>
						open ? expandDefaultPieces() : collapseDefaultPieces()
					}
				>
					<CollapsibleTrigger asChild>
						<Button
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
								<Button
									key={piece}
									className="flex flex-row gap-2"
									variant="ghost"
									onClick={() =>
										updateCurrentSheetMode(
											"pieceConfiguration",
										)
									}
								>
									<Icon className="size-5" />
									<span>{piece}</span>
								</Button>
							),
						)}
					</CollapsibleContent>
				</Collapsible>

				<Collapsible
					open={isCustomPiecesExpanded}
					onOpenChange={(open) =>
						open ? expandCustomPieces() : collapseCustomPieces()
					}
				>
					<CollapsibleTrigger asChild>
						<Button
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
		</>
	);
}

export default PiecesSelectionScreen;
