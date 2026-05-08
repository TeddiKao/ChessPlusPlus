import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import usePieceImagesStore from "@/features/variants/common/stores/pieceImages";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import { IconChevronDown, IconX } from "@tabler/icons-react";

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
								<div className="flex flex-row items-center justify-between w-full p-2">
									{pieceOwnershipRules[
										color as keyof typeof pieceOwnershipRules
									].map((piece) => (
										<img
											key={piece}
											className="size-12"
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
