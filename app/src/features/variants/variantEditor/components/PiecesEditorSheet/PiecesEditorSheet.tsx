import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import useSidebarStore from "@/features/variants/variantEditor/stores/sidebar";

function PiecesEditorSheet() {
	const { currentOpenMenu, updateCurrentOpenMenu, clearCurrentOpenMenu } =
		useSidebarStore();

	return (
		<Sheet
			open={currentOpenMenu === "pieces"}
			onOpenChange={(open) => {
				if (open) {
					updateCurrentOpenMenu("pieces");
				} else {
					clearCurrentOpenMenu();
				}
			}}
		>
			<SheetContent showCloseButton={false}>
				<SheetHeader>
					<SheetTitle>Pieces Editor</SheetTitle>
					<SheetDescription>
						Edit the pieces in this variant.
					</SheetDescription>
				</SheetHeader>

				<SheetFooter>
					<Button>Create piece</Button>
					<Button variant="outline">Close</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

export default PiecesEditorSheet;
