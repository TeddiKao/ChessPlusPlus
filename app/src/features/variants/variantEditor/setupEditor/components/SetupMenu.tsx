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
		<div className="flex flex-col">
			<div className="flex flex-row justify-between items-center">
				<h1 className="text-2xl font-bold">Setup options</h1>
				<Button variant="ghost">
					<IconX className="size-5" />
				</Button>
			</div>

			<Collapsible>
				<CollapsibleTrigger asChild>
					<span>Pieces</span>
					<Button variant="ghost">
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
