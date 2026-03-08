import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import useVariantsStore from "@/features/variants/common/stores/variantsStore";

function VariantListDialog() {
	const { variants } = useVariantsStore();

	console.log(useVariantsStore.persist.hasHydrated());

	if (!useVariantsStore.persist.hasHydrated()) return null;

	return (
		<Dialog open={true}>
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
								className="flex flex-row gap-2 shadow-md p-2 rounded-md bg-gray-300 shadow-gray-600"
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
