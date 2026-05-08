import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { IconCheck, IconSearch, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ScrollArea } from "@/components/ui/scroll-area";

type SelectionDialogItem = {
	name: string;
	bottomComponent?: React.ReactNode;
	isSelected?: boolean;
};

type SelectionDialogProps = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	onSelection: (selection: string) => void;

	title: string;
	description?: string;

	searchPlaceholder: string;
	searchQuery: string;
	updateSearchQuery: (searchQuery: string) => void;
	clearSearchQuery: () => void;

	items: SelectionDialogItem[];
};

function SelectionDialog({
	isOpen,
	onOpenChange,
	onSelection,
	title,
	description,
	searchPlaceholder,
	searchQuery,
	updateSearchQuery,
	clearSearchQuery,
	items,
}: SelectionDialogProps) {
	function handleSearchQueryInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		updateSearchQuery(e.target.value);
	}

	function handleClearSearchQueryButtonClick() {
		clearSearchQuery();
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="h-[90vh] flex flex-col">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && (
						<DialogDescription>{description}</DialogDescription>
					)}
				</DialogHeader>

				<div className="flex flex-col gap-4 flex-1 min-h-0">
					<InputGroup>
						<InputGroupInput
							type="text"
							placeholder={searchPlaceholder}
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
						<div className="flex flex-col gap-2 pr-4">
							{items
								.filter((item) =>
									item.name.includes(searchQuery),
								)
								.map(({ name, bottomComponent, isSelected }) => {
									return (
										<Button
											key={name}
											variant="ghost"
											onClick={() =>
												onSelection(name)
											}
											className={clsx(
												"font-normal text-left w-full h-auto flex flex-row items-center justify-between gap-2 p-2 rounded-lg",
												isSelected
													? "bg-sidebar-primary-foreground hover:bg-(--sidebar-primary-hover)"
													: "hover:bg-muted",
											)}
										>
											<div className="flex flex-col gap-1">
												<span>{name}</span>
												{bottomComponent}
											</div>

											{isSelected && (
												<div className="flex flex-row items-center justify-center">
													<IconCheck
														className="size-5 stroke-primary"
														stroke={1.5}
													/>
												</div>
											)}
										</Button>
									);
								})}
						</div>
					</ScrollArea>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default SelectionDialog;
