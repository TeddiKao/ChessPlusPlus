import {
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import {
	IconChevronLeft,
	IconChevronUp,
	IconUpload,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Field, FieldLabel } from "@/components/ui/field";

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
					<Field className="grid grid-cols-2 gap-4 items-center">
						<FieldLabel htmlFor="pieceName">Piece name</FieldLabel>
						<Input
							id="pieceName"
							className="bg-white"
							placeholder="Piece name"
						/>
					</Field>

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
				<TabsContent value="movements">
					<Collapsible>
						<CollapsibleTrigger
							className="flex flex-row justify-between w-full"
							asChild
						>
							<Button variant="ghost">
								<span>Movement 1</span>
								<IconChevronUp />
							</Button>
						</CollapsibleTrigger>

						<CollapsibleContent className="flex flex-col gap-4"></CollapsibleContent>
					</Collapsible>
				</TabsContent>
			</Tabs>
		</>
	);
}

export default PieceEditorScreen;
