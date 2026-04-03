import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import useMovementAddDialogStore from "@/features/variants/variantEditor/piecesEditor/stores/movementAddDialog";
import { Badge } from "@/components/ui/badge";
import { IconPlus } from "@tabler/icons-react";

function MovementAddDialog() {
	const {
		isMovementAddDialogOpen,
		openMovementAddDialog,
		closeMovementAddDialog,
		movementsAdded,
	} = useMovementAddDialogStore();

	return (
		<Dialog
			open={isMovementAddDialogOpen}
			onOpenChange={(open) => {
				if (open) {
					openMovementAddDialog();
				} else {
					closeMovementAddDialog();
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add movements</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col gap-2">
					<div className="flex flex-row justify-between items-center">
						<p className="font-semibold text-muted-foreground">
							Movements
						</p>

						<Button variant="ghost" className="stroke-muted-foreground p-0 px-1">
							<IconPlus className="size-4" />
						</Button>
					</div>

					<div className="flex flex-row">
						{movementsAdded.map((movementName) => (
							<Badge key={movementName} variant="outline">
								{movementName}
							</Badge>
						))}
					</div>
				</div>

				<DialogFooter>
					<Button className="px-4">Add movements</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default MovementAddDialog;
