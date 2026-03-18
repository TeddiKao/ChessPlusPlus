import { TabsContent } from "@/components/ui/tabs";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconUpload } from "@tabler/icons-react";

function AppearanceTab() {
	return (
		<TabsContent value="appearance" className="flex flex-col gap-4 w-full">
			<Field className="grid grid-cols-2 gap-4 items-center">
				<FieldLabel className="font-normal" htmlFor="pieceName">
					Piece name
				</FieldLabel>
				<Input
					id="pieceName"
					className="bg-white"
					placeholder="Piece name"
				/>
			</Field>

			<div className="grid grid-cols-2 gap-4 items-center">
				<p>Piece image (white)</p>
				<Button className="flex flex-row gap-2" variant="outline">
					<IconUpload />
					<span>Upload image</span>
				</Button>
			</div>

			<div className="grid grid-cols-2 gap-4 items-center">
				<p>Piece image (black)</p>
				<Button className="flex flex-row gap-2" variant="outline">
					<IconUpload />
					<span>Upload image</span>
				</Button>
			</div>
		</TabsContent>
	);
}

export default AppearanceTab;
