import {
	Field,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import usePieceMovementEditorStore from "@/features/variants/variantEditor/pieces/pieceEditor/stores/pieceMovementEditor";
import { type ChangeEvent, useRef } from "react";

function RangeFieldSet() {
	const { range, updateRange } = usePieceMovementEditorStore();

	const originalRangeValueRef = useRef(range);

	function handleRangeInputChange(event: ChangeEvent<HTMLInputElement>) {
		updateRange(Number(event.target.value));
		originalRangeValueRef.current = Number(event.target.value);
	}

	function handleInfiniteRangeCheckboxChange(checked: boolean) {
		if (checked) {
			updateRange("inf");
		} else {
			updateRange(originalRangeValueRef.current);
		}
	}

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
					disabled={range === "inf"}
					value={range === "inf" ? "" : range}
					onChange={handleRangeInputChange}
				/>
			</Field>

			<Field orientation="horizontal">
				<Checkbox
					checked={range === "inf"}
					onCheckedChange={handleInfiniteRangeCheckboxChange}
					className="border-gray-600"
					id="infiniteRange"
				/>
				<FieldLabel className="font-normal" htmlFor="infiniteRange">
					Infinite range
				</FieldLabel>
			</Field>
		</FieldSet>
	);
}

export default RangeFieldSet;
