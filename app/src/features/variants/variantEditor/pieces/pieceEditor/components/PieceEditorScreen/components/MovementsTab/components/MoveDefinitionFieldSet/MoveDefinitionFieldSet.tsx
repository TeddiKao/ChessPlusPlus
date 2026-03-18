import { FieldLegend, FieldSet } from "@/components/ui/field";
import OffsetField from "@/features/variants/variantEditor/pieces/pieceEditor/components/PieceEditorScreen/components/MovementsTab/components/MoveDefinitionFieldSet/components/OffsetField";
import RangeFieldSet from "@/features/variants/variantEditor/pieces/pieceEditor/components/PieceEditorScreen/components/MovementsTab/components/MoveDefinitionFieldSet/components/RangeFieldSet";

function MoveDefinitionFieldSet() {
	return (
		<FieldSet>
			<FieldLegend className="mb-1" variant="label">
				Move definitions
			</FieldLegend>

			<OffsetField />
			<RangeFieldSet />
		</FieldSet>
	);
}

export default MoveDefinitionFieldSet;
