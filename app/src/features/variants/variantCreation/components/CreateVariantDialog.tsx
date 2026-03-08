import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCreateVariantDialogStore from "@/features/variants/variantCreation/stores/createVariantDialogStore";
import type { ChangeEvent } from "react";
import { Label } from "@/components/ui/label";

function CreateVariantDialog() {
	const { variantName, updateVariantName } = useCreateVariantDialogStore();

	function handleVariantNameOnChange(e: ChangeEvent<HTMLInputElement>) {
		updateVariantName((e.target as HTMLInputElement).value);
	}

	return (
		<Dialog open={true}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create variant</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col gap-2">
					<Label htmlFor="variantNameInput">Variant name</Label>
					<Input
						name="variantNameInput"
						type="text"
						placeholder="Variant name"
						onChange={handleVariantNameOnChange}
						value={variantName}
					/>
				</div>

				<DialogFooter>
					<Button className="w-full">Create variant</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default CreateVariantDialog;
