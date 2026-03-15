import {
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { IconChevronLeft, IconUpload } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

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

				<TabsContent
					value="appearance"
					className="flex flex-col gap-4 w-full"
				>
					<div className="grid grid-cols-2 gap-4 items-center">
						<p>Piece name</p>
						<Input className="bg-white" placeholder="Piece name" />
					</div>

					<div className="grid grid-cols-2 gap-4 items-center">
						<p>Piece image (white)</p>
						<Button
							className="flex flex-row gap-2"
							variant="outline"
						>
							<IconUpload />
							<span>Upload image</span>
						</Button>
					</div>

					<div className="grid grid-cols-2 gap-4 items-center">
						<p>Piece image (black)</p>
						<Button
							className="flex flex-row gap-2"
							variant="outline"
						>
							<IconUpload />
							<span>Upload image</span>
						</Button>
					</div>
				</TabsContent>
				<TabsContent value="movements">Movements content</TabsContent>
			</Tabs>
		</>
	);
}

export default PieceEditorScreen;
