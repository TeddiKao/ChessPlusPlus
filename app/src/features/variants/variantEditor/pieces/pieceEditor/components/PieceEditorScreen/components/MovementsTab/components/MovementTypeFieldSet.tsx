import {
	Field,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

function MovementTypeFieldSet() {
	return (
		<FieldSet className="gap-2">
			<FieldLegend variant="label">Movement types</FieldLegend>
			<Field orientation="horizontal">
				<Checkbox
					className="border-gray-600"
					id="for-movement-checkbox"
				/>
				<FieldLabel
					className="font-normal"
					htmlFor="for-movement-checkbox"
				>
					For movement
				</FieldLabel>
			</Field>
			<Field orientation="horizontal">
				<Checkbox
					className="border-gray-600"
					id="for-capture-checkbox"
				/>
				<FieldLabel
					className="font-normal"
					htmlFor="for-capture-checkbox"
				>
					For capture
				</FieldLabel>
			</Field>
		</FieldSet>
	);
}

export default MovementTypeFieldSet;
