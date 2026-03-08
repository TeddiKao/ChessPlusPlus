import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import useVariantsStore from "@/features/variants/common/stores/variantsStore";
import useVariantListDialogStore from "@/features/variants/variantListing/stores/variantListDialogStore";

function VariantListDialog() {
	const { variants } = useVariantsStore();
	const {
		isOpen,
		openDialog,
		closeDialog,
		selectedVariantId,
		updateSelectedVariantId,
	} = useVariantListDialogStore();

	console.log(useVariantsStore.persist.hasHydrated());

	if (!useVariantsStore.persist.hasHydrated()) return null;

	function handleVariantSelection(variantId: string) {
		updateSelectedVariantId(variantId);
	}

	return (
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
										: "flex flex-row gap-2 shadow-md p-2 rounded-md shadow-gray-600"
								}
								key={variantId}
							>
								<span>{variantInfo.variantName}</span>
							</button>
						),
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default VariantListDialog;
