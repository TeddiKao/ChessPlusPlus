import {
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

function MovementsEditorSheet() {
	return (
		<SheetContent showCloseButton={false}>
			<SheetHeader>
				<SheetTitle>Movements editor</SheetTitle>
				<SheetDescription>
					Edit piece movement rules here
				</SheetDescription>
			</SheetHeader>

			<SheetFooter>
				<SheetClose>Close</SheetClose>
			</SheetFooter>
		</SheetContent>
	);
}

export default MovementsEditorSheet;
