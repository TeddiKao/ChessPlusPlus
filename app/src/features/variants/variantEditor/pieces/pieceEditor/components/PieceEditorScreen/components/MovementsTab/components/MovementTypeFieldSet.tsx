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
		addMovementEditorChanges,
	} = usePieceMovementEditorStore();

	function handleForMovementCheckboxChange(checked: boolean) {
		if (checked) {
			enableMovement();
			addMovementEditorChanges({ forMovement: true });
		} else {
			disableMovement();
			addMovementEditorChanges({ forMovement: false });
		}
	}

	function handleForCaptureCheckboxChange(checked: boolean) {
		if (checked) {
			enableCapture();
			addMovementEditorChanges({ forCapture: true });
		} else {
			disableCapture();
			addMovementEditorChanges({ forCapture: false });
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
