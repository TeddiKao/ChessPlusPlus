import {
	Field,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import usePieceMovementEditorStore from "@/features/variants/variantEditor/pieces/pieceEditor/stores/pieceMovementEditor";

function MovementTypeFieldSet() {
	const {
		forMovement,
		enableMovement,
		disableMovement,
		forCapture,
		enableCapture,
		disableCapture,
	} = usePieceMovementEditorStore();

	function handleForMovementCheckboxChange(checked: boolean) {
		if (checked) {
			enableMovement();
		} else {
			disableMovement();
		}
	}

	function handleForCaptureCheckboxChange(checked: boolean) {
		if (checked) {
			enableCapture();
		} else {
			disableCapture();
		}
	}

	return (
		<FieldSet className="gap-2">
			<FieldLegend variant="label">Movement types</FieldLegend>
			<Field orientation="horizontal">
				<Checkbox
					className="border-gray-600"
					id="for-movement-checkbox"
					checked={forMovement}
					onCheckedChange={handleForMovementCheckboxChange}
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
					checked={forCapture}
					onCheckedChange={handleForCaptureCheckboxChange}
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
