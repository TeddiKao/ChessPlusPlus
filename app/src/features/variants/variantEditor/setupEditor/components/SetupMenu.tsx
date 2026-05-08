import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconChevronDown, IconX } from "@tabler/icons-react";

function SetupMenu() {
	return (
		<div className="bg-muted p-2 rounded-lg">
			<div className="flex flex-row justify-between items-center p-2 gap-4">
				<h1 className="text-xl font-semibold">Setup options</h1>
				<Button size="icon-xs" variant="ghost">
					<IconX className="size-4" />
				</Button>
			</div>

			<Collapsible>
				<CollapsibleTrigger asChild>
					<Button className="flex flex-row items-center justify-between w-full" variant="ghost">
						<span>Pieces</span>
						<IconChevronDown className="size-5" />
					</Button>
				</CollapsibleTrigger>

				<CollapsibleContent>
					<Tabs>
						<TabsList>
							<TabsTrigger value="white">White</TabsTrigger>
							<TabsTrigger value="black">Black</TabsTrigger>
						</TabsList>
					</Tabs>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}

export default SetupMenu;
