import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import { IconChevronDown, IconX } from "@tabler/icons-react";

function SetupMenu() {
	const { setupRulesDraft } = useVariantDraftStore();

	if (!setupRulesDraft) return null;

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
					</Tabs>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}

export default SetupMenu;
