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

export function MovementEditorScreen() {
	const { activeMovementName } = useMovementsEditorStore();
	const { updateCurrentMode } = useMovementsEditorSheetStore();

	function handleBackClick() {
		updateCurrentMode("movementSelection");
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
							/>
							<FieldLabel htmlFor="isMovementAllowed">
								Movement
							</FieldLabel>
						</Field>
						<Field orientation="horizontal">
							<Checkbox
								className="bg-background"
								id="isCaptureAllowed"
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
							/>
							<Input
								className="bg-background"
								type="text"
								placeholder="Y"
							/>
						</div>
					</Field>

					<FieldSet>
						<FieldLegend className="data-[variant=legend]:text-sm">Range settings</FieldLegend>
						<Field className="grid grid-cols-2 items-center" orientation="horizontal">
							<FieldLabel htmlFor="movementRangeInput">
								Range
							</FieldLabel>
							<Input
								className="bg-background"
								id="movementRangeInput"
								type="number"
								placeholder="Range"
							/>
						</Field>

						<Field orientation="horizontal">
							<Checkbox
								className="bg-background"
								id="hasUnlimitedRange"
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
