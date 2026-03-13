import { PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useBoardSettingsStore from "@/features/variants/variantEditor/stores/boardSettings";
import type { ChangeEvent } from "react";

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
			<div className="flex flex-col gap-2">
				<div className="grid grid-cols-2 gap-4 items-center">
					<p>Board setup</p>
					<Button>Edit setup</Button>
				</div>

				<div className="grid grid-cols-2 gap-4 items-center">
					<p>Board width</p>
					<Input
						value={boardXSize}
						onChange={handleBoardWidthInputChange}
						type="number"
						defaultValue={8}
					/>
				</div>

				<div className="grid grid-cols-2 gap-4 items-center">
					<p>Board height</p>
					<Input
						value={boardYSize}
						onChange={handleBoardHeightInputChange}
						type="number"
						defaultValue={8}
					/>
				</div>
			</div>
		</PopoverContent>
	);
}

export default BoardSettingsMenu;
