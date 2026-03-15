import {
	Sheet,
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
import { pieceIconMap } from "@/features/variants/variantEditor/constants/pieceIconMap";
import usePieceSettingsStore from "@/features/variants/variantEditor/stores/pieceSettings/pieceSettingsSheet";
import usePieceSelectionScreenStore from "@/features/variants/variantEditor/stores/pieceSettings/pieceSelectionScreen";

function PiecesMenu() {
	const { isOpen, openPieceSettingsSheet, closePieceSettingsSheet } =
		usePieceSettingsStore();
	const {
		isDefaultPiecesExpanded,
		expandDefaultPieces,
		collapseDefaultPieces,
		isCustomPiecesExpanded,
		expandCustomPieces,
		collapseCustomPieces,
	} = usePieceSelectionScreenStore();

	return (
		<Sheet
			open={isOpen}
			onOpenChange={(open) =>
				open ? openPieceSettingsSheet() : closePieceSettingsSheet()
			}
		>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Pieces</SheetTitle>
					<SheetDescription>
						Click on a piece to edit it, or add a new piece
					</SheetDescription>
				</SheetHeader>

				<Collapsible>
					<CollapsibleTrigger asChild>
						<Button
							variant="ghost"
							className="flex flex-row justify-between w-full"
						>
							<span>Default (8)</span>
							{isDefaultPiecesExpanded ? (
								<IconChevronUp />
							) : (
								<IconChevronDown />
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

				<SheetFooter>
					<Button>Add piece</Button>
					<SheetClose asChild>
						<Button variant="outline">Close</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

export default PiecesMenu;
