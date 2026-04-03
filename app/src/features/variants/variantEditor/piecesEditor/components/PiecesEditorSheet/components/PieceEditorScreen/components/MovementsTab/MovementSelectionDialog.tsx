import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import useMovementSelectionDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/movementSelectionDialog";
import {
	IconArrowsMove,
	IconLetterX,
	IconLetterY,
	IconRadar,
	IconSearch,
	IconSword,
	IconX,
} from "@tabler/icons-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";
import { Fragment } from "react/jsx-runtime";

function MovementSelectionDialog() {
	const {
		isMovementSelectionDialogOpen,
		openMovementSelectionDialog,
		closeMovementSelectionDialog,
		searchQuery,
		updateSearchQuery,
		clearSearchQuery,
	} = useMovementSelectionDialogStore();

	const { movementRulesDraft } = useVariantDraftStore();
	if (!movementRulesDraft) return null;

	function handleClearSearchQueryButtonClick() {
		clearSearchQuery();
	}

	function handleSearchQueryInputChange(
		e: React.ChangeEvent<HTMLInputElement>,
	) {
		updateSearchQuery(e.target.value);
	}

	return (
		<Dialog
			open={isMovementSelectionDialogOpen}
			onOpenChange={(isOpen) => {
				if (isOpen) {
					openMovementSelectionDialog();
				} else {
					closeMovementSelectionDialog();
				}
			}}
		>
			<DialogContent className="h-[90vh] flex flex-col">
				<DialogHeader>
					<DialogTitle>Select movements</DialogTitle>
					<DialogDescription>
						Select the movements you want to add to the piece.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-4 flex-1 min-h-0">
					<InputGroup>
						<InputGroupInput
							type="text"
							placeholder="Search movements"
							value={searchQuery}
							onChange={handleSearchQueryInputChange}
						/>

						<InputGroupAddon align="inline-start">
							<IconSearch />
						</InputGroupAddon>

						{searchQuery.length > 0 && (
							<InputGroupAddon align="inline-end">
								<Button
									variant="ghost"
									className="stroke-muted-foreground p-0 px-1"
									onClick={handleClearSearchQueryButtonClick}
								>
									<IconX />
								</Button>
							</InputGroupAddon>
						)}
					</InputGroup>

					<ScrollArea className="flex-1 min-h-0">
						<div className="grid grid-cols-7 gap-x-4 gap-y-2">
							{Object.entries(movementRulesDraft)
								.filter(([movementName]) =>
									movementName.includes(searchQuery.trim()),
								)
								.map(([movementName, movementRule]) => (
									<Fragment key={movementName}>
										<p className="col-span-7">
											{movementName}
										</p>

										<div className="flex flex-row gap-2 items-center">
											<IconRadar
												className="size-5"
												stroke={1.5}
											/>
											<p>
												{
													movementRule.moveDefinition
														.range
												}
											</p>
										</div>

										<div className="flex flex-row gap-2 items-center">
											<IconLetterX
												className="size-5"
												stroke={1.5}
											/>
											<p>
												{
													movementRule.moveDefinition
														.moveX
												}
											</p>
										</div>

										<div className="flex flex-row gap-2 items-center">
											<IconLetterY
												className="size-5"
												stroke={1.5}
											/>
											<p>
												{
													movementRule.moveDefinition
														.moveY
												}
											</p>
										</div>

										<div className="flex flex-row gap-2 items-center">
											<IconArrowsMove
												className={clsx(
													"size-5",
													!movementRule.forMovement &&
														"text-muted-foreground/50",
												)}
												stroke={1.5}
											/>
											<IconSword
												className={clsx(
													"size-5",
													!movementRule.forCapture &&
														"text-muted-foreground/50",
												)}
												stroke={1.5}
											/>
										</div>
									</Fragment>
								))}
						</div>
					</ScrollArea>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default MovementSelectionDialog;
