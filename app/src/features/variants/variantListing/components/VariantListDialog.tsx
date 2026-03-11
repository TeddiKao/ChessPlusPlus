import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import useVariantsStore from "@/features/variants/common/stores/variantsStore";
import useVariantListDialogStore from "@/features/variants/variantListing/stores/variantListDialogStore";
import { Button } from "@/components/ui/button";
import DeleteVariantAlert from "@/features/variants/variantListing/components/DeleteVariantAlert";

function VariantListDialog() {
	const { variants, hasHydrated, removeVariant } = useVariantsStore();
	const {
		isOpen,
		openDialog,
		closeDialog,
		selectedVariantId,
		updateSelectedVariantId,
		clearSelectedVariantId,
	} = useVariantListDialogStore();

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
				onOpenChange={(open) => (open ? openDialog() : closeDialog())}
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
							<Button className="px-4" type="button">
								Rename
							</Button>
							<Button
								className="px-4"
								type="button"
								variant="destructive"
								onClick={() => removeVariant(selectedVariantId)}
							>
								Delete
							</Button>
						</DialogFooter>
					)}
				</DialogContent>
			</Dialog>

			<DeleteVariantAlert />
		</>
	);
}

export default VariantListDialog;
