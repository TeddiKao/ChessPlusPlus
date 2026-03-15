import {
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { IconChevronLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function PieceEditorScreen() {
	return (
		<>
			<SheetHeader>
				<SheetTitle className="flex flex-row items-center gap-2">
					<Button variant="ghost">
						<IconChevronLeft className="size-5" />
					</Button>
					<span>Piece Editor</span>
				</SheetTitle>
				<SheetDescription>
					You are currently editing the bishop. Click the back arrow
					to switch your selection.
				</SheetDescription>
			</SheetHeader>

			<Tabs>
				<TabsList defaultValue="appearance" variant="line">
					<TabsTrigger value="appearance">Appearance</TabsTrigger>
					<TabsTrigger value="movements">Movements</TabsTrigger>
				</TabsList>

				<TabsContent value="appearance">Appearance content</TabsContent>
				<TabsContent value="movements">Movements content</TabsContent>
			</Tabs>
		</>
	);
}

export default PieceEditorScreen;
