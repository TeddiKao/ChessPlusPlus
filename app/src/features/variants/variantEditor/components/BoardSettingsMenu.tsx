import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PopoverContent } from "@/components/ui/popover";
import useSetupSettingsEditorStore from "@/features/variants/variantEditor/stores/setupSettingsEditor";
import { type ChangeEvent, useEffect } from "react";
import useVariantDraftStore from "@/features/variants/variantEditor/stores/variantDraft";

function BoardSettingsMenu() {
	const { updateBoardXSize, boardXSize, updateBoardYSize, boardYSize } =
		useSetupSettingsEditorStore();
	const { setupRulesDraft } = useVariantDraftStore();

	useEffect(() => {
		if (!setupRulesDraft) return;

		const initialBoardXSize = setupRulesDraft.boardXSize;
		if (!initialBoardXSize) return;

		const initialBoardYSize = setupRulesDraft.boardYSize;
		if (!initialBoardYSize) return;

		updateBoardXSize(initialBoardXSize);
		updateBoardYSize(initialBoardYSize);
	}, [setupRulesDraft, updateBoardXSize, updateBoardYSize]);

	if (!boardXSize) return null;
	if (!boardYSize) return null;

	function handleBoardXSizeInputChange(e: ChangeEvent<HTMLInputElement>) {
		const newBoardXSize = e.target.valueAsNumber;

		if (Number.isNaN(newBoardXSize)) return;
		if (!Number.isFinite(newBoardXSize)) return;

		updateBoardXSize(newBoardXSize);
	}

	function handleBoardYSizeInputChange(e: ChangeEvent<HTMLInputElement>) {
		const newBoardYSize = e.target.valueAsNumber;

		if (Number.isNaN(newBoardYSize)) return;
		if (!Number.isFinite(newBoardYSize)) return;

		updateBoardYSize(newBoardYSize);
	}

	return (
		<PopoverContent side="left" sideOffset={8} align="start">
			<div className="flex flex-col gap-4">
				<h1 className="text-base font-semibold">Board settings</h1>

				<div className="grid grid-cols-2 gap-4 items-center">
					<p>Board setup</p>
					<Button>Edit setup</Button>
				</div>

				<FieldSet className="flex flex-col gap-4">
					<Field
						className="grid grid-cols-2 gap-4 items-center"
						orientation="horizontal"
					>
						<FieldLabel htmlFor="boardWidthInput">
							Board width
						</FieldLabel>
						<Input
							id="boardWidthInput"
							type="number"
							placeholder="Width"
							value={boardXSize}
							onChange={handleBoardXSizeInputChange}
						/>
					</Field>

					<Field
						className="grid grid-cols-2 gap-4 items-center"
						orientation="horizontal"
					>
						<FieldLabel htmlFor="boardHeightInput">
							Board height
						</FieldLabel>
						<Input
							id="boardHeightInput"
							type="number"
							placeholder="Height"
							value={boardYSize}
							onChange={handleBoardYSizeInputChange}
						/>
					</Field>
				</FieldSet>
			</div>
		</PopoverContent>
	);
}

export default BoardSettingsMenu;
