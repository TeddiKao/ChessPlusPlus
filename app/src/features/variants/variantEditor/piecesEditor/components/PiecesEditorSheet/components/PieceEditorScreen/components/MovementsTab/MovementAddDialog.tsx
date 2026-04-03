import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

function MovementAddDialog() {
	return (
		<Dialog open={true}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add movements</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col gap-2">
					<p className="font-semibold text-muted-foreground">Movements</p>
				</div>

				<DialogFooter>
					<Button>Add movements</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default MovementAddDialog;