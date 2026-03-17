import usePieceSelectionScreenStore from "@/features/variants/variantEditor/pieces/pieceSelection/stores/pieceSelectionScreen";
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
import { pieceIconMap } from "@/features/variants/variantEditor/pieces/pieceSelection/constants/pieceIconMap";
import usePieceSettingsStore from "@/features/variants/variantEditor/pieces/common/stores/pieceSettingsSheet";
import useSetupRulesDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft/setupRulesDraft";
import { getPiecesList } from "@/features/variants/variantEditor/pieces/pieceSelection/utils/piecesList";

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

	const { setupRules } = useSetupRulesDraftStore();
	if (!setupRules) return null;

	const pieceOwnership = setupRules.pieceOwnership;
	const piecesList = getPiecesList(pieceOwnership);

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
							<span>Default ({piecesList.default.length})</span>
							{isDefaultPiecesExpanded ? (
								<IconChevronDown />
							) : (
								<IconChevronUp />
							)}
						</Button>
					</CollapsibleTrigger>

					<CollapsibleContent>
						{piecesList.default.map((piece) => {
							const Icon = pieceIconMap.get(piece);
							if (!Icon) return null;

							return (
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
							);
						})}
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
