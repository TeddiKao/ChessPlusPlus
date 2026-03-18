import {
	Field,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

function RangeFieldSet() {
	return (
		<FieldSet className="gap-2">
			<FieldLegend className="mb-1" variant="label">
				Range settings
			</FieldLegend>
			<Field className="grid grid-cols-2 gap-2" orientation="horizontal">
				<FieldLabel className="font-normal" htmlFor="pieceRange">
					Range
				</FieldLabel>
				<Input
					id="pieceRange"
					className="bg-background"
					type="number"
					placeholder="Range"
				/>
			</Field>

			<Field orientation="horizontal">
				<Checkbox className="border-gray-600" id="infiniteRange" />
				<FieldLabel className="font-normal" htmlFor="infiniteRange">
					Infinite range
				</FieldLabel>
			</Field>
		</FieldSet>
	);
}

export default RangeFieldSet;
