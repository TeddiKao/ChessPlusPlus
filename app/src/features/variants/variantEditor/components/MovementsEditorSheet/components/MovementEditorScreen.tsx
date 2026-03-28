import useMovementsEditorStore from "@/features/variants/variantEditor/stores/movementsEditor";
import useMovementsEditorSheetStore from "@/features/variants/variantEditor/stores/movementsEditorSheet";
import {
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { IconChevronLeft } from "@tabler/icons-react";
import {
	Field,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRef, type ChangeEvent } from "react";
import { isNullOrUndefined } from "@/shared/utils/typeChecks";

export function MovementEditorScreen() {
	const {
		activeMovementName,

		movementName,
		updateMovementName,
		forMovement,
		toggleForMovement,
		forCapture,
		toggleForCapture,
		range,
		updateRange,
		offsetX,
		updateOffsetX,
		offsetY,
		updateOffsetY,

		addMovementsEditorChanges,
	} = useMovementsEditorStore();
	const { updateCurrentMode } = useMovementsEditorSheetStore();

	const previousRangeInputRef = useRef<number | null>(null);

	if (!activeMovementName) return null;
	if (!movementName) return null;
	if (!forMovement) return null;
	if (!forCapture) return null;
	if (isNullOrUndefined(range)) return null;
	if (!offsetX) return null;
	if (!offsetY) return null;

	function handleBackClick() {
		updateCurrentMode("movementSelection");
	}

	function handleMovementNameInputChange(e: ChangeEvent<HTMLInputElement>) {
		updateMovementName(e.target.value);
		addMovementsEditorChanges({ movementName: e.target.value });
	}

	function handleForMovementInputChange(checked: boolean) {
		toggleForMovement();
		addMovementsEditorChanges({ forMovement: checked });
	}

	function handleForCaptureInputChange(checked: boolean) {
		toggleForCapture();
		addMovementsEditorChanges({ forCapture: checked });
	}

	function handleRangeInputChange(e: ChangeEvent<HTMLInputElement>) {
		const newRange = e.target.valueAsNumber;
		if (Number.isNaN(newRange)) return;
		if (!Number.isFinite(newRange)) return;

		updateRange(newRange);
		previousRangeInputRef.current = newRange;
		addMovementsEditorChanges({ range: newRange });
	}

	function handleUnlimitedRangeInputChange(checked: boolean) {
		updateRange(checked ? "inf" : (previousRangeInputRef.current ?? 1));
		addMovementsEditorChanges({
			range: checked ? "inf" : (previousRangeInputRef.current ?? 1),
		});
	}

	function handleOffsetXInputChange(e: ChangeEvent<HTMLInputElement>) {
		updateOffsetX(e.target.valueAsNumber);
		addMovementsEditorChanges({ offsetX: e.target.valueAsNumber });
	}

	function handleOffsetYInputChange(e: ChangeEvent<HTMLInputElement>) {
		updateOffsetY(e.target.valueAsNumber);
		addMovementsEditorChanges({ offsetY: e.target.valueAsNumber });
	}

	return (
		<>
			<SheetHeader>
				<div className="flex flex-row gap-2 items-center">
					<Button
						className="p-0 hover:bg-(--sidebar-primary-hover)"
						variant="ghost"
						onClick={handleBackClick}
					>
						<IconChevronLeft className="size-5" />
					</Button>

					<SheetTitle>Movement editor</SheetTitle>
				</div>

				<SheetDescription>
					You are currently editing the movement rule "
					{activeMovementName}". Click on the back arrow to change
					your selection.
				</SheetDescription>
			</SheetHeader>

			<div className="px-4 flex flex-col gap-4">
				<FieldSet>
					<FieldLegend>Basic information</FieldLegend>
					<Field
						className="grid grid-cols-2 items-center"
						orientation="horizontal"
					>
						<FieldLabel htmlFor="movementNameInput">
							Name
						</FieldLabel>
						<Input
							className="bg-background"
							id="movementNameInput"
							type="text"
							placeholder="Movement name"
							value={movementName}
							onChange={handleMovementNameInputChange}
						/>
					</Field>
				</FieldSet>

				<FieldSet>
					<FieldLegend>Allowed move types</FieldLegend>

					<div className="flex flex-col gap-2">
						<Field orientation="horizontal">
							<Checkbox
								className="bg-background"
								id="isMovementAllowed"
								checked={forMovement ?? false}
								onCheckedChange={handleForMovementInputChange}
							/>
							<FieldLabel htmlFor="isMovementAllowed">
								Movement
							</FieldLabel>
						</Field>
						<Field orientation="horizontal">
							<Checkbox
								className="bg-background"
								id="isCaptureAllowed"
								checked={forCapture ?? false}
								onCheckedChange={handleForCaptureInputChange}
							/>
							<FieldLabel htmlFor="isCaptureAllowed">
								Capture
							</FieldLabel>
						</Field>
					</div>
				</FieldSet>

				<FieldSet>
					<FieldLegend>Move definition</FieldLegend>
					<Field className="grid grid-cols-2 items-center">
						<FieldLabel>Offsets</FieldLabel>

						<div className="grid grid-cols-2 gap-2 items-center">
							<Input
								className="bg-background"
								type="text"
								placeholder="X"
								value={offsetX}
								onChange={handleOffsetXInputChange}
							/>
							<Input
								className="bg-background"
								type="text"
								placeholder="Y"
								value={offsetY}
								onChange={handleOffsetYInputChange}
							/>
						</div>
					</Field>

					<FieldSet className="gap-2">
						<FieldLegend className="data-[variant=legend]:text-sm">
							Range settings
						</FieldLegend>
						<Field
							className="grid grid-cols-2 items-center"
							orientation="horizontal"
						>
							<FieldLabel htmlFor="movementRangeInput">
								Range
							</FieldLabel>
							<Input
								className="bg-background"
								id="movementRangeInput"
								type="number"
								placeholder="Range"
								value={range}
								onChange={handleRangeInputChange}
								disabled={range === "inf"}
								aria-disabled={range === "inf"}
							/>
						</Field>

						<Field orientation="horizontal">
							<Checkbox
								className="bg-background"
								id="hasUnlimitedRange"
								checked={range === "inf"}
								onCheckedChange={
									handleUnlimitedRangeInputChange
								}
							/>
							<FieldLabel htmlFor="hasUnlimitedRange">
								Unlimited
							</FieldLabel>
						</Field>
					</FieldSet>
				</FieldSet>
			</div>

			<SheetFooter>
				<Button variant="destructive">Delete movement</Button>
			</SheetFooter>
		</>
	);
}
