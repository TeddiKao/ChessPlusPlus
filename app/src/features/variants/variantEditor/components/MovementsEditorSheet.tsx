import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import useSidebarStore from "@/features/variants/variantEditor/stores/sidebar";

function MovementsEditorSheet() {
	const { currentOpenMenu, updateCurrentOpenMenu, clearCurrentOpenMenu } =
		useSidebarStore();

	return (
		<Sheet
			open={currentOpenMenu === "movements"}
			onOpenChange={(open) => {
				if (open) {
					updateCurrentOpenMenu("movements");
				} else {
					clearCurrentOpenMenu();
				}
			}}
		>
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
		</Sheet>
	);
}

export default MovementsEditorSheet;
