import { PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useBoardSettingsStore from "@/features/variants/variantEditor/boardSettings/stores/boardSettings";
import type { ChangeEvent } from "react";
import {
	Field,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";

function BoardSettingsMenu() {
	const { boardXSize, boardYSize, updateBoardXSize, updateBoardYSize } =
		useBoardSettingsStore();

	function handleBoardWidthInputChange(e: ChangeEvent<HTMLInputElement>) {
		updateBoardXSize(Number(e.target.value));
	}

	function handleBoardHeightInputChange(e: ChangeEvent<HTMLInputElement>) {
		updateBoardYSize(Number(e.target.value));
	}

	return (
		<PopoverContent align="start" sideOffset={8} side="left">
			<h2 className="text-base font-semibold">Board settings</h2>
			<div className="flex flex-col gap-4">
				<div className="grid grid-cols-2 gap-4 items-center">
					<p>Board setup</p>
					<Button>Edit setup</Button>
				</div>

				<FieldSet>
					<FieldLegend className="mb-1" variant="label">
						Board size
					</FieldLegend>
					<div className="flex flex-col gap-2">
						<Field className="grid grid-cols-2 gap-4 items-center">
							<FieldLabel
								className="font-normal"
								htmlFor="boardWidth"
							>
								Board width
							</FieldLabel>
							<Input
								id="boardWidth"
								value={boardXSize}
								onChange={handleBoardWidthInputChange}
								type="number"
							/>
						</Field>

						<Field className="grid grid-cols-2 gap-4 items-center">
							<FieldLabel
								className="font-normal"
								htmlFor="boardHeight"
							>
								Board height
							</FieldLabel>
							<Input
								id="boardHeight"
								value={boardYSize}
								onChange={handleBoardHeightInputChange}
								type="number"
							/>
						</Field>
					</div>
				</FieldSet>
			</div>
		</PopoverContent>
	);
}

export default BoardSettingsMenu;
