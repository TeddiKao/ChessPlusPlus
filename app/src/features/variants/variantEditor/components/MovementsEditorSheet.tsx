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
import useVariantDraftStore from "@/features/variants/variantEditor/stores/variantDraft";

function MovementsEditorSheet() {
	const { currentOpenMenu, updateCurrentOpenMenu, clearCurrentOpenMenu } =
		useSidebarStore();
	const { movementRulesDraft } = useVariantDraftStore();

	if (!movementRulesDraft) return null;

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
				<SheetHeader className="px-4 pt-4">
					<SheetTitle>Movements editor</SheetTitle>
					<SheetDescription>
						Edit piece movement rules here
					</SheetDescription>
				</SheetHeader>

				<div className="flex flex-col overflow-y-auto px-3">
					{Object.entries(movementRulesDraft).map(
						([movementName]) => (
							<Button
								className="p-0 px-1 text-left justify-start hover:bg-(--sidebar-primary-hover)"
								variant="ghost"
							>
								{movementName}
							</Button>
						),
					)}
				</div>

				<SheetFooter className="px-4 pb-4">
					<SheetClose asChild>
						<Button variant="outline">Close</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

export default MovementsEditorSheet;
