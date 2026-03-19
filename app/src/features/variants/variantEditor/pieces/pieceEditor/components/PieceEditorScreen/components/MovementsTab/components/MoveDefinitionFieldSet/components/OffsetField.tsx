import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import usePieceMovementEditorStore from "@/features/variants/variantEditor/pieces/pieceEditor/stores/pieceMovementEditor";
import type { ChangeEvent } from "react";

function OffsetField() {
	const {
		offsetX,
		updateOffsetX,
		offsetY,
		updateOffsetY,
		addMovementEditorChanges,
		commitToDraft,
	} = usePieceMovementEditorStore();

	function handleOffsetXChange(event: ChangeEvent<HTMLInputElement>) {
		const newOffsetX = event.target.valueAsNumber;
		if (Number.isNaN(newOffsetX)) return;

		updateOffsetX(newOffsetX);
		addMovementEditorChanges({ offsetX: newOffsetX });
	}

	function handleOffsetYChange(event: ChangeEvent<HTMLInputElement>) {
		const newOffsetY = event.target.valueAsNumber;
		if (Number.isNaN(newOffsetY)) return;

		updateOffsetY(newOffsetY);
		addMovementEditorChanges({ offsetY: newOffsetY });
	}

	function handleOffsetXBlur() {
		commitToDraft(["offsetX"]);
	}

	function handleOffsetYBlur() {
		commitToDraft(["offsetY"]);
	}

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
					onBlur={handleOffsetXBlur}
					value={offsetX}
					onChange={handleOffsetXChange}
				/>
				<Input
					className="bg-background"
					type="number"
					placeholder="Y"
					onBlur={handleOffsetYBlur}
					value={offsetY}
					onChange={handleOffsetYChange}
				/>
			</div>
		</Field>
	);
}

export default OffsetField;
