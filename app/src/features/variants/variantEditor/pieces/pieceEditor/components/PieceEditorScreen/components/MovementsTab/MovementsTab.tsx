import usePieceEditorStore from "@/features/variants/variantEditor/pieces/pieceEditor/stores/pieceEditor";
import usePieceRulesDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft/pieceRulesDraft";
import usePieceMovementEditorStore
	from "@/features/variants/variantEditor/pieces/pieceEditor/stores/pieceMovementEditor";
import {getMovementsListForPiece} from "@/features/variants/variantEditor/pieces/pieceEditor/utils/movementsList";
import _ from "lodash";
import { TabsContent } from "@/components/ui/tabs";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	AppliesToFieldSet
} from "@/features/variants/variantEditor/pieces/pieceEditor/components/PieceEditorScreen/components/MovementsTab/components/AppliesToFieldSet";
import MovementTypeFieldSet
	from "@/features/variants/variantEditor/pieces/pieceEditor/components/PieceEditorScreen/components/MovementsTab/components/MovementTypeFieldSet";
import {
	MoveDefinitionFieldSet
} from "@/features/variants/variantEditor/pieces/pieceEditor/components/PieceEditorScreen/components/MovementsTab/components/MoveDefinitionFieldSet/MoveDefinitionFieldSet";

export function MovementsTab() {
	const { currentPiece } = usePieceEditorStore();
	const { pieces } = usePieceRulesDraftStore();
	const {
		activeMovementName,
		updateActiveMovementName,
		clearActiveMovementName,
	} = usePieceMovementEditorStore();

	if (!currentPiece) return null;
	if (!pieces) return null;

	if (!pieces[`white_${currentPiece}`]) return null;
	if (!pieces[`black_${currentPiece}`]) return null;

	const whitePieceMovements = getMovementsListForPiece(
		pieces[`white_${currentPiece}`],
	);
	const blackPieceMovements = getMovementsListForPiece(
		pieces[`black_${currentPiece}`],
	);

	const movementsList = _.isEqual(whitePieceMovements, blackPieceMovements)
		? whitePieceMovements
		: [...whitePieceMovements, ...blackPieceMovements];

	return (
		<TabsContent value="movements" className="flex flex-col gap-4">
			<Accordion
				value={activeMovementName ?? undefined}
				onValueChange={(value) => {
					if (value) {
						updateActiveMovementName(value);
					} else {
						clearActiveMovementName();
					}
				}}
				collapsible
				type="single"
			>
				{movementsList.map(({ moveName, path }) => {
					const key = `${moveName}_${path.join("-")}`;

					return (
						<AccordionItem
							className="border-none no-underline hover:no-underline"
							value={moveName}
							key={key}
						>
							<AccordionTrigger className="flex flex-row justify-between w-full pt-0 pb-3">
								<span>{moveName}</span>
							</AccordionTrigger>

							<AccordionContent className="flex flex-col gap-4">
								<AppliesToFieldSet />
								<MovementTypeFieldSet />
								<MoveDefinitionFieldSet />
							</AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>
		</TabsContent>
	);
}