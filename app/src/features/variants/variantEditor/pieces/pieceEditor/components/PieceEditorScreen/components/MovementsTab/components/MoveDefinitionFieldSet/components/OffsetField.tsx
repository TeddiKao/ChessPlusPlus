import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function OffsetField() {
	return (
		<Field className="grid grid-cols-2 gap-2">
			<FieldLabel className="text-foreground mb-0 font-normal">
				Offsets
			</FieldLabel>

			<div className="grid grid-cols-2 gap-2 items-center">
				<Input
					className="bg-background"
					type="number"
					placeholder="X"
				/>
				<Input
					className="bg-background"
					type="number"
					placeholder="Y"
				/>
			</div>
		</Field>
	);
}