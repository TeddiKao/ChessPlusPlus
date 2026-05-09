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
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import {
	IconChevronDown,
	IconDotsVertical,
	IconPencil,
	IconTrash,
	IconX,
} from "@tabler/icons-react";
import { ChessKnight } from "lucide-react";

function SetupMenu() {
	const { setupRulesDraft, pieceRulesetDraft, currentVariantId } =
		useVariantDraftStore();
	const { images } = usePieceImagesStore();

	if (!setupRulesDraft) return null;
	if (!pieceRulesetDraft) return null;
	if (!images) return null;
	if (!currentVariantId) return null;

	const pieceOwnershipRules = setupRulesDraft.pieceOwnership;
	const colorsPlaying = Object.keys(pieceOwnershipRules);

	return (
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
						{colorsPlaying.map((color) => {
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
											<DropdownMenuItem>
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
							{colorsPlaying.map((color) => (
								<TabsTrigger key={color} value={color}>
									{color}
								</TabsTrigger>
							))}
						</TabsList>

						{colorsPlaying.map((color) => (
							<TabsContent key={color} value={color}>
								<div className="grid grid-cols-8 w-full p-2">
									{pieceOwnershipRules[
										color as keyof typeof pieceOwnershipRules
									].map((piece) => (
										<img
											key={piece}
											className="size-12 hover:bg-gray-300 rounded-md"
											src={URL.createObjectURL(
												images[piece][
													currentVariantId
												] ?? images[piece].image,
											)}
											alt={piece}
										/>
									))}
								</div>
							</TabsContent>
						))}
					</Tabs>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}

export default SetupMenu;
