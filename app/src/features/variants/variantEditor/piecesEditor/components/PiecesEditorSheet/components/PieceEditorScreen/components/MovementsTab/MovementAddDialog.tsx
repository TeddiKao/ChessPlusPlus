import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

function MovementAddDialog() {
	return (
		<Dialog open={true}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add movements</DialogTitle>
				</DialogHeader>

				<DialogFooter>
					<Button>Add movements</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default MovementAddDialog;