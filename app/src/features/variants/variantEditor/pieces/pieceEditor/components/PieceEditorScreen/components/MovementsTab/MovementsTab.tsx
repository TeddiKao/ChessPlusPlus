import usePieceEditorStore from "@/features/variants/variantEditor/pieces/pieceEditor/stores/pieceEditor";
import usePieceRulesDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft/pieceRulesDraft";
import usePieceMovementEditorStore from "@/features/variants/variantEditor/pieces/pieceEditor/stores/pieceMovementEditor";
import { getMovementsListForPiece } from "@/features/variants/variantEditor/pieces/pieceEditor/utils/movements";
import _ from "lodash";
import { TabsContent } from "@/components/ui/tabs";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import AppliesToFieldSet from "@/features/variants/variantEditor/pieces/pieceEditor/components/PieceEditorScreen/components/MovementsTab/components/AppliesToFieldSet";
import MovementTypeFieldSet from "@/features/variants/variantEditor/pieces/pieceEditor/components/PieceEditorScreen/components/MovementsTab/components/MovementTypeFieldSet";
import MoveDefinitionFieldSet from "@/features/variants/variantEditor/pieces/pieceEditor/components/PieceEditorScreen/components/MovementsTab/components/MoveDefinitionFieldSet/MoveDefinitionFieldSet";
import { useEffect } from "react";
import useMovementRulesDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft/movementRulesDraft";

function MovementsTab() {
	const { currentPiece } = usePieceEditorStore();
	const { pieces } = usePieceRulesDraftStore();
	const { movementRules } = useMovementRulesDraftStore();
	const {
		activeMovementName,
		updateActiveMovementName,
		clearActiveMovementName,
		activeMovementPath,
		updateActiveMovementPath,
		clearActiveMovementPath,

		updateAppliesTo,
		updateForMovement,
		updateForCapture,
		updateOffsetX,
		updateOffsetY,
		updateRange,
	} = usePieceMovementEditorStore();

	useEffect(() => {
		if (!pieces) return;
		if (!currentPiece) return;
		if (!activeMovementName) return;
		if (!activeMovementPath) return;
		if (!movementRules) return;

		const movementInfo = movementRules[activeMovementName];
		if (!movementInfo) return;

		const whitePieceMovements = getMovementsListForPiece(
			pieces[`white_${currentPiece}`],
		);
		const blackPieceMovements = getMovementsListForPiece(
			pieces[`black_${currentPiece}`],
		);

		const isInWhite = whitePieceMovements.some(
			(movement) =>
				movement.moveName === activeMovementName &&
				_.isEqual(movement.path, activeMovementPath),
		);
		const isInBlack = blackPieceMovements.some(
			(movement) =>
				movement.moveName === activeMovementName &&
				_.isEqual(movement.path, activeMovementPath),
		);

		if (isInWhite && isInBlack) {
			updateAppliesTo("both");
		} else if (isInWhite) {
			updateAppliesTo("white");
		} else if (isInBlack) {
			updateAppliesTo("black");
		}

		updateOffsetX(movementInfo.moveDefinition.moveX);
		updateOffsetY(movementInfo.moveDefinition.moveY);
		updateRange(movementInfo.moveDefinition.range);
		updateForMovement(movementInfo.forMovement);
		updateForCapture(movementInfo.forCapture);
	}, [
		pieces,
		currentPiece,
		activeMovementName,
		activeMovementPath,
		movementRules,
		updateAppliesTo,
		updateForCapture,
		updateForMovement,
		updateOffsetX,
		updateOffsetY,
		updateRange,
	]);

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

	const accordionValue =
		activeMovementName && activeMovementPath
			? `${activeMovementName}__${activeMovementPath.join("-")}`
			: "";

	return (
		<TabsContent value="movements" className="flex flex-col gap-4">
			<Accordion
				value={accordionValue}
				onValueChange={(value) => {
					if (value) {
						const [movementName, path] = value.split("__");

						updateActiveMovementName(movementName);
						updateActiveMovementPath(
							path
								.split("-")
								.map((pathIndex) => Number(pathIndex)),
						);
					} else {
						clearActiveMovementName();
						clearActiveMovementPath();
					}
				}}
				collapsible
				type="single"
			>
				{movementsList.map(({ moveName, path }) => {
					const key = `${moveName}__${path.join("-")}`;

					return (
						<AccordionItem
							className="border-none no-underline hover:no-underline"
							value={key}
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

export default MovementsTab;
