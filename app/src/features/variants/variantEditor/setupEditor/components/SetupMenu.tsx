import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import usePieceImagesStore from "@/features/variants/common/stores/pieceImages";
import SelectionDialog from "@/features/variants/variantEditor/common/components/SelectionDialog";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import usePieceOwnershipSelectionDialogStore from "@/features/variants/variantEditor/setupEditor/stores/pieceOwnershipSelectionDialog";
import { useDraggable } from "@dnd-kit/react";
import {
	IconChevronDown,
	IconDotsVertical,
	IconPencil,
	IconX,
} from "@tabler/icons-react";
import { ChessKnight } from "lucide-react";

type PieceImageProps = {
	player: string;
	piece: string;
};

function PieceImage({ player, piece }: PieceImageProps) {
	const { images } = usePieceImagesStore();
	const { currentVariantId } = useVariantDraftStore();

	const { ref } = useDraggable({
		id: `${player}-${piece}`,
	});

	if (!images) return null;
	if (!currentVariantId) return null;

	const pieceImage = URL.createObjectURL(
		images[piece][currentVariantId] ?? images[piece].image,
	);

	return (
		<img
			ref={ref}
			key={`${player}-${piece}`}
			className="size-12 hover:bg-gray-300 rounded-md"
			src={pieceImage}
			alt={piece}
		/>
	);
}

function SetupMenu() {
	const {
		setupRulesDraft,
		updateSetupRulesDraft,
		pieceRulesetDraft,
		currentVariantId,
	} = useVariantDraftStore();
	const { images } = usePieceImagesStore();
	const {
		isPieceOwnershipSelectionDialogOpen,
		openPieceOwnershipSelectionDialog,
		closePieceOwnershipSelectionDialog,
		player,
		updatePlayer,
		searchQuery,
		updateSearchQuery,
		clearSearchQuery,
	} = usePieceOwnershipSelectionDialogStore();

	if (!setupRulesDraft) return null;
	if (!pieceRulesetDraft) return null;
	if (!images) return null;
	if (!currentVariantId) return null;

	const pieceOwnershipRules = setupRulesDraft.pieceOwnership;
	const players = Object.keys(pieceOwnershipRules);

	const selectionList = player
		? Object.keys(pieceRulesetDraft).map((piece) => {
				return {
					name: piece,
					isSelected: pieceOwnershipRules[player].includes(piece),
				};
			})
		: [];

	function handlePieceSelection(piece: string) {
		if (!player) return;
		if (!setupRulesDraft) return;

		const updatedSetupRulesDraft = structuredClone(setupRulesDraft);

		if (updatedSetupRulesDraft.pieceOwnership[player].includes(piece)) {
			updatedSetupRulesDraft.pieceOwnership[player] =
				updatedSetupRulesDraft.pieceOwnership[player].filter(
					(p) => p !== piece,
				);
		} else {
			updatedSetupRulesDraft.pieceOwnership[player] = [
				...updatedSetupRulesDraft.pieceOwnership[player],
				piece,
			];
		}

		updateSetupRulesDraft(updatedSetupRulesDraft);
	}

	function handleEditPiecesButtonClick(playerName: string) {
		console.log(playerName);

		openPieceOwnershipSelectionDialog();
		updatePlayer(playerName);
	}

	return (
		<>
			<div className="bg-muted p-2 rounded-lg">
				<div className="flex flex-row justify-between items-center p-2 gap-4">
					<h1 className="text-xl font-semibold">Setup options</h1>
					<Button size="icon-xs" variant="ghost">
						<IconX className="size-4" />
					</Button>
				</div>

				<Collapsible>
					<div className="flex flex-row items-center justify-between w-full p-2">
						<span className="text-sm font-semibold">Players</span>
						<CollapsibleTrigger asChild>
							<Button
								variant="ghost"
								size="icon-xs"
								className="hover:bg-gray-300"
							>
								<IconChevronDown className="size-4" />
							</Button>
						</CollapsibleTrigger>
					</div>

					<CollapsibleContent>
						<div className="flex flex-col">
							{players.map((color) => {
								return (
									<div
										key={color}
										className="flex flex-row items-center justify-between w-full px-2"
									>
										<span className="text-sm">{color}</span>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													size="icon-xs"
													className="hover:bg-gray-300 py-4"
												>
													<IconDotsVertical className="size-5" />
												</Button>
											</DropdownMenuTrigger>

											<DropdownMenuContent side="right">
												<DropdownMenuItem
													onClick={() =>
														handleEditPiecesButtonClick(
															color,
														)
													}
												>
													<ChessKnight className="size-4" />
													Edit pieces
												</DropdownMenuItem>
												<DropdownMenuItem>
													<IconPencil className="size-4" />
													Rename
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								);
							})}
						</div>
					</CollapsibleContent>
				</Collapsible>

				<Collapsible>
					<div className="flex flex-row items-center justify-between w-full p-2">
						<span className="text-sm font-semibold">Pieces</span>
						<CollapsibleTrigger asChild>
							<Button
								variant="ghost"
								size="icon-xs"
								className="hover:bg-gray-300"
							>
								<IconChevronDown className="size-4" />
							</Button>
						</CollapsibleTrigger>
					</div>

					<CollapsibleContent>
						<Tabs>
							<TabsList variant="line">
								{players.map((color) => (
									<TabsTrigger key={color} value={color}>
										{color}
									</TabsTrigger>
								))}
							</TabsList>

							{players.map((color) => (
								<TabsContent key={color} value={color}>
									<div className="grid grid-cols-8 w-full p-2">
										{pieceOwnershipRules[
											color as keyof typeof pieceOwnershipRules
										].map((piece) => (
											<PieceImage
												key={piece}
												piece={piece}
												player={color}
											/>
										))}
									</div>
								</TabsContent>
							))}
						</Tabs>
					</CollapsibleContent>
				</Collapsible>
			</div>

			<SelectionDialog
				isOpen={isPieceOwnershipSelectionDialogOpen}
				onOpenChange={(open) => {
					if (open) {
						openPieceOwnershipSelectionDialog();
					} else {
						closePieceOwnershipSelectionDialog();
					}
				}}
				onSelection={handlePieceSelection}
				title="Select pieces"
				description="Select the pieces you want to assign to the player"
				items={selectionList}
				searchPlaceholder="Search pieces"
				searchQuery={searchQuery}
				updateSearchQuery={updateSearchQuery}
				clearSearchQuery={clearSearchQuery}
			/>
		</>
	);
}

export default SetupMenu;
