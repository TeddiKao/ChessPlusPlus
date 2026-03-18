import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import usePieceMovementEditorStore from "@/features/variants/variantEditor/pieces/pieceEditor/stores/pieceMovementEditor";
import type { ChangeEvent } from "react";

function OffsetField() {
	const { offsetX, updateOffsetX, offsetY, updateOffsetY } =
		usePieceMovementEditorStore();

	function handleOffsetXChange(event: ChangeEvent<HTMLInputElement>) {
		updateOffsetX(Number(event.target.value));
	}

	function handleOffsetYChange(event: ChangeEvent<HTMLInputElement>) {
		updateOffsetY(Number(event.target.value));
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
					value={offsetX}
					onChange={handleOffsetXChange}
				/>
				<Input
					className="bg-background"
					type="number"
					placeholder="Y"
					value={offsetY}
					onChange={handleOffsetYChange}
				/>
			</div>
		</Field>
	);
}

export default OffsetField;
