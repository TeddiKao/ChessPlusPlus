import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

function PiecesMenu() {
	return (
		<Sheet open={true}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Pieces</SheetTitle>
					<SheetDescription>
						Click on a piece to edit it, or add a new piece
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}

export default PiecesMenu;
