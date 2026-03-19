import {
	Field,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import usePieceMovementEditorStore from "@/features/variants/variantEditor/pieces/pieceEditor/stores/pieceMovementEditor";

function AppliesToFieldSet() {
	const { appliesTo, updateAppliesTo, addMovementEditorChanges } =
		usePieceMovementEditorStore();

	function handleAppliesToDropdownChange(
		appliesToValue: "white" | "black" | "both",
	) {
		updateAppliesTo(appliesToValue);
		addMovementEditorChanges({ appliesTo: appliesToValue });
	}

	return (
		<FieldSet>
			<FieldLegend className="mb-1" variant="label">
				Applies to
			</FieldLegend>
			<Field className="grid grid-cols-2 gap-2" orientation="horizontal">
				<FieldLabel className="font-normal">Side</FieldLabel>
				<Select
					value={appliesTo}
					onValueChange={handleAppliesToDropdownChange}
				>
					<SelectTrigger className="w-full bg-background">
						<SelectValue placeholder="Select side" />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value="white">White</SelectItem>
						<SelectItem value="black">Black</SelectItem>
						<SelectItem value="both">Both</SelectItem>
					</SelectContent>
				</Select>
			</Field>
		</FieldSet>
	);
}

export default AppliesToFieldSet;
