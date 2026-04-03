import usePiecesEditorStore from "@/features/variants/variantEditor/piecesEditor/stores/piecesEditor";
import { Button } from "@/components/ui/button";
import {
	IconChevronDown,
	IconChevronUp,
	IconDotsVertical,
	IconX,
} from "@tabler/icons-react";
import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from "@/components/ui/collapsible";
import { TabsContent } from "@/components/ui/tabs";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import MovementAddDialog from "@/features/variants/variantEditor/piecesEditor/components/PiecesEditorSheet/components/PieceEditorScreen/components/MovementsTab/MovementAddDialog";

export function MovementsTab() {
	const {
		activePieceMovements,
		isMovementsExpanded,
		expandMovements,
		collapseMovements,
	} = usePiecesEditorStore();

	return (
		<>
			<TabsContent value="movements">
				<Collapsible
					className="flex flex-col gap-1"
					open={isMovementsExpanded}
					onOpenChange={(open) => {
						if (open) {
							expandMovements();
						} else {
							collapseMovements();
						}
					}}
				>
					<div className="flex flex-row items-center justify-between">
						<p className="font-semibold">Movements</p>

						<CollapsibleTrigger asChild>
							<Button
								variant="ghost"
								className="p-0 px-1 hover:bg-(--sidebar-primary-hover) hover:aria-expanded:bg-(--sidebar-primary-hover)"
							>
								{isMovementsExpanded ? (
									<IconChevronUp className="size-4" />
								) : (
									<IconChevronDown className="size-4" />
								)}
							</Button>
						</CollapsibleTrigger>
					</div>

					<CollapsibleContent className="flex flex-col overflow-y-auto">
						{activePieceMovements.map((movement) => (
							<div
								className="flex flex-row items-center justify-between"
								key={movement.moveName}
							>
								<p>{movement.moveName}</p>

								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="ghost"
											className="p-0 hover:bg-(--sidebar-primary-hover)"
										>
											<IconDotsVertical className="size-5" />
										</Button>
									</DropdownMenuTrigger>

									<DropdownMenuContent side="left">
										<DropdownMenuItem variant="destructive">
											<IconX className="size-4" />
											Remove
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						))}
					</CollapsibleContent>
				</Collapsible>
			</TabsContent>
			
			<MovementAddDialog />
		</>
	);
}
