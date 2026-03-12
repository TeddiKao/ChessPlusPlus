import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import useVariantsStore from "@/features/variants/common/stores/variantsStore";
import useVariantListDialogStore from "@/features/variants/variantListing/stores/variantListDialog";
import { Button } from "@/components/ui/button";
import DeleteVariantAlert from "@/features/variants/variantListing/components/DeleteVariantAlert";
import useVariantDeleteAlertStore from "@/features/variants/variantListing/stores/variantDeleteAlert";
import VariantRenameDialog from "@/features/variants/variantListing/components/VariantRenameDialog";

function VariantListDialog() {
	const { variants, hasHydrated } = useVariantsStore();
	const {
		isOpen,
		openDialog: openVariantListDialog,
		closeDialog: closeVariantListDialog,
		selectedVariantId,
		updateSelectedVariantId,
		clearSelectedVariantId,
	} = useVariantListDialogStore();

	const { openAlert } = useVariantDeleteAlertStore();

	if (!hasHydrated) return null;

	function handleVariantSelection(variantId: string) {
		if (variantId === selectedVariantId) {
			clearSelectedVariantId();
		} else {
			updateSelectedVariantId(variantId);
		}
	}

	return (
		<>
			<Dialog
				open={isOpen}
				onOpenChange={(open) =>
					open ? openVariantListDialog() : closeVariantListDialog()
				}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>My variants</DialogTitle>
						<DialogDescription>
							Below is a list of your created variants
						</DialogDescription>
					</DialogHeader>

					<div className="flex flex-col gap-2">
						{Object.entries(variants).map(
							([variantId, variantInfo]) => (
								<button
									type="button"
									onClick={() =>
										handleVariantSelection(variantId)
									}
									className={
										selectedVariantId === variantId
											? "flex flex-row gap-2 p-2 rounded-md border-primary border-2 bg-(--muted-primary) [--tw-shadow-color:var(--shadow-primary)] shadow-md"
											: "flex flex-row gap-2 shadow-md p-2 rounded-md bg-gray-300 shadow-gray-600"
									}
									aria-pressed={
										selectedVariantId === variantId
									}
									key={variantId}
								>
									<span>{variantInfo.variantName}</span>
								</button>
							),
						)}
					</div>

					{selectedVariantId && (
						<DialogFooter>
							<Button
								onClick={() => open}
								className="px-4"
								type="button"
							>
								Rename
							</Button>
							<Button
								className="px-4"
								type="button"
								variant="destructive"
								onClick={() => openAlert(selectedVariantId)}
							>
								Delete
							</Button>
						</DialogFooter>
					)}
				</DialogContent>
			</Dialog>

			<DeleteVariantAlert />
			<VariantRenameDialog />
		</>
	);
}

export default VariantListDialog;
