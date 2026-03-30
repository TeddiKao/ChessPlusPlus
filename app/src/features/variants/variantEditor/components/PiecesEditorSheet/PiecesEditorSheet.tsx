import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
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
			<SheetContent>
				<SheetTitle>Pieces Editor</SheetTitle>
				<SheetDescription>
					Edit the pieces in this variant.
				</SheetDescription>
			</SheetContent>

			<SheetFooter>
				<Button>Create piece</Button>
				<Button variant="outline">Close</Button>
			</SheetFooter>
		</Sheet>
	);
}

export default PiecesEditorSheet;
