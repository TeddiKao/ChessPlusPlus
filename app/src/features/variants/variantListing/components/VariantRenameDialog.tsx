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
import useVariantsStore from "@/features/variants/common/stores/variantsStore";

function VariantRenameDialog() {
	const {
		isOpen,
		openDialog,
		closeDialog,
		variantIdToRename,
		newVariantName,
		updateNewVariantName,
	} = useVariantRenameDialogStore();
	const { variants, updateVariant } = useVariantsStore();

	useEffect(() => {
		if (!variantIdToRename) return;
		if (!variants[variantIdToRename]) return;

		updateNewVariantName(variants[variantIdToRename].variantName);
	}, [variants, variantIdToRename, updateNewVariantName]);

	if (!variantIdToRename) return;

	function handleVariantNameInputChange(e: ChangeEvent<HTMLInputElement>) {
		updateNewVariantName(e.target.value);
	}

	function handleVariantRenameFormSubmit(e: SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!variantIdToRename) return;
		if (newVariantName.trim() === "") return;

		const updatedVariant = structuredClone(variants[variantIdToRename]);
		updatedVariant.variantName = newVariantName;

		updateVariant(variantIdToRename, updatedVariant);
		closeDialog();
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) =>
				open ? openDialog(variantIdToRename) : closeDialog()
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
