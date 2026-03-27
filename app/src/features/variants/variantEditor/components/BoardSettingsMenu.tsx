import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PopoverContent } from "@/components/ui/popover";

function BoardSettingsMenu() {
	return (
		<PopoverContent side="left" sideOffset={8} align="start">
			<div className="flex flex-col gap-4">
				<h1 className="text-base font-semibold">Board settings</h1>

				<div className="grid grid-cols-2 gap-4 items-center">
					<p>Board setup</p>
					<Button>Edit setup</Button>
				</div>

				<FieldSet className="flex flex-col gap-4">
					<Field
						className="grid grid-cols-2 gap-4 items-center"
						orientation="horizontal"
					>
						<FieldLabel htmlFor="boardWidthInput">
							Board width
						</FieldLabel>
						<Input
							id="boardWidthInput"
							type="number"
							placeholder="Width"
						/>
					</Field>

					<Field
						className="grid grid-cols-2 gap-4 items-center"
						orientation="horizontal"
					>
						<FieldLabel htmlFor="boardHeightInput">
							Board height
						</FieldLabel>
						<Input
							id="boardHeightInput"
							type="number"
							placeholder="Height"
						/>
					</Field>
				</FieldSet>
			</div>
		</PopoverContent>
	);
}

export default BoardSettingsMenu;
