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
import type { ChangeEvent, SyntheticEvent } from "react";
import { Button } from "@/components/ui/button";
import useVariantListDialogStore from "@/features/variants/variantListing/stores/variantListDialog";

function VariantRenameDialog() {
	const {
		isOpen,
		openDialog,
		closeDialog,
		newVariantName,
		updateNewVariantName,
	} = useVariantRenameDialogStore();
	const { selectedVariantId } = useVariantListDialogStore();

	if (!selectedVariantId) return;

	function handleVariantNameInputChange(e: ChangeEvent<HTMLInputElement>) {
		updateNewVariantName(e.target.value);
	}

	function handleVariantRenameFormSubmit(e: SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();
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
