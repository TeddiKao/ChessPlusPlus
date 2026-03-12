import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useVariantRenameDialogStore from "@/features/variants/variantListing/stores/variantRenameDialog";
import { type ChangeEvent, type SyntheticEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import useVariantListDialogStore from "@/features/variants/variantListing/stores/variantListDialog";
import useVariantsStore from "@/features/variants/common/stores/variantsStore";

function VariantRenameDialog() {
	const {
		isOpen,
		openDialog,
		closeDialog,
		newVariantName,
		updateNewVariantName,
	} = useVariantRenameDialogStore();
	const { selectedVariantId } = useVariantListDialogStore();
	const { variants, updateVariant } = useVariantsStore();

	useEffect(() => {
		if (!selectedVariantId) return;
		if (!variants[selectedVariantId]) return;

		updateNewVariantName(variants[selectedVariantId].variantName);
	}, [variants, selectedVariantId, updateNewVariantName]);

	if (!selectedVariantId) return;

	function handleVariantNameInputChange(e: ChangeEvent<HTMLInputElement>) {
		updateNewVariantName(e.target.value);
	}

	function handleVariantRenameFormSubmit(e: SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!selectedVariantId) return;

		const updatedVariant = structuredClone(variants[selectedVariantId]);
		updatedVariant.variantName = newVariantName;

		updateVariant(selectedVariantId, updatedVariant);
		closeDialog();
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) =>
				open ? openDialog(selectedVariantId) : closeDialog()
			}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Rename variant</DialogTitle>
				</DialogHeader>

				<form
					onSubmit={handleVariantRenameFormSubmit}
					className="flex flex-col gap-4"
				>
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-2">
							<Label htmlFor="name">Variant name</Label>
							<Input
								value={newVariantName}
								onChange={handleVariantNameInputChange}
								type="text"
								id="name"
								name="name"
							/>
						</div>
					</div>

					<DialogFooter>
						<Button className="w-full" type="submit">
							Rename variant
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default VariantRenameDialog;
