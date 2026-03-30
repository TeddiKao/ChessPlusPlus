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
import useVariantDraftStore from "@/features/variants/variantEditor/stores/variantDraft";

function PiecesEditorSheet() {
	const { currentOpenMenu, updateCurrentOpenMenu, clearCurrentOpenMenu } =
		useSidebarStore();

	const { pieceRulesetDraft } = useVariantDraftStore();
	if (!pieceRulesetDraft) return null;

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
			<SheetContent className="bg-sidebar-primary-foreground" showCloseButton={false}>
				<SheetHeader>
					<SheetTitle>Pieces Editor</SheetTitle>
					<SheetDescription>
						Edit the pieces in this variant.
					</SheetDescription>
				</SheetHeader>

				<div className="flex flex-col px-3">
					{Object.keys(pieceRulesetDraft).map((piece) => (
						<Button className="p-0 px-1 justify-start hover:bg-(--sidebar-primary-hover)" variant="ghost" key={piece}>{piece}</Button>
					))}
				</div>

				<SheetFooter>
					<Button>Create piece</Button>
					<Button variant="outline">Close</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

export default PiecesEditorSheet;
