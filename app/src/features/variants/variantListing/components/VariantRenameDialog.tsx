import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useVariantRenameDialogStore from "@/features/variants/variantListing/stores/variantRenameDialog";
import type { ChangeEvent } from "react";

function VariantRenameDialog() {
	const { newVariantName, updateNewVariantName } =
		useVariantRenameDialogStore();

	function handleVariantNameInputChange(
		event: ChangeEvent<HTMLInputElement>,
	) {
		updateNewVariantName(event.target.value);
	}

	return (
		<Dialog>
			<DialogHeader>
				<DialogTitle>Rename variant</DialogTitle>
			</DialogHeader>

			<form>
				<div className="flex flex-col gap-4">
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
			</form>
		</Dialog>
	);
}

export default VariantRenameDialog;
