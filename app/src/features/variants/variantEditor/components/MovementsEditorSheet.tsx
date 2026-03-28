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
import { Button } from "@/components/ui/button";

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
			<SheetContent
				className="bg-sidebar-primary-foreground"
				showCloseButton={false}
			>
				<SheetHeader>
					<SheetTitle>Movements editor</SheetTitle>
					<SheetDescription>
						Edit piece movement rules here
					</SheetDescription>
				</SheetHeader>

				<SheetFooter>
					<SheetClose asChild>
						<Button variant="outline">Close</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

export default MovementsEditorSheet;
