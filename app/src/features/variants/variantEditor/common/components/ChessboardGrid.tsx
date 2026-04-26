import usePieceImagesStore from "@/features/variants/common/stores/pieceImages";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import {
	generateAlphabetSequence,
	generateNumberSequence,
} from "@/features/variants/variantEditor/common/utils/boardGeneration";
import type { GameState } from "@/features/variants/common/types/setupRules";

type ChessboardGridProps = {
	boardState: GameState;
	legalMoves: Record<string, [number, number][]>;
};

function ChessboardGrid({ boardState, legalMoves }: ChessboardGridProps) {
	const { images } = usePieceImagesStore();
	const { currentVariantId, setupRulesDraft, pieceRulesetDraft } =
		useVariantDraftStore();

	if (!setupRulesDraft) return null;
	if (!pieceRulesetDraft) return null;
	if (!images) return null;
	if (!currentVariantId) return null;

	const boardXSize = setupRulesDraft.boardXSize;
	const boardYSize = setupRulesDraft.boardYSize;

	const ranks = generateNumberSequence(boardYSize).reverse();
	const files = generateAlphabetSequence(boardXSize);

	const legalMoveEntries = Object.entries(legalMoves);

	function renderPieceImage(imageId: string, pieceName: string) {
		if (!currentVariantId) return null;

		const imageBlob =
			images[imageId][currentVariantId] ?? images[imageId].image;
		const imageUrl = URL.createObjectURL(imageBlob);

		return (
			<div className="w-full h-full flex items-center justify-center">
				<img src={imageUrl} alt={pieceName} />
			</div>
		);
	}

	return (
		<div className="grid grid-cols-8 aspect-square max-w-md">
			{ranks.map((rank) =>
				files.map((file) => {
					const isDark = (rank + files.indexOf(file)) % 2 === 0;

					const fileNumber = files.indexOf(file);

					const foundSquare = boardState.get([fileNumber, rank]);
					const imageId =
						pieceRulesetDraft[foundSquare ?? ""]?.imageId;

					const legalMovements = legalMoveEntries
						.filter(([, coordinates]) => {
							return coordinates.some(
								(coordinate) =>
									coordinate[0] === fileNumber &&
									coordinate[1] === rank,
							);
						})
						.map(([movementLabel]) => {
							return movementLabel;
						});

					return (
						<div
							key={file}
							className={`${isDark ? "bg-chessboard-square-dark" : "bg-chessboard-square-light"} aspect-square relative`}
						>
							{foundSquare
								? renderPieceImage(
										imageId ?? "",
										foundSquare ?? "",
									)
								: null}

							<div
								key={`${rank}-${file}`}
								className="absolute top-0 left-0 flex flex-row flex-wrap gap-2 p-2"
							>
								{legalMovements.length > 0
									? legalMovements.map((movementLabel) => (
											<span key={movementLabel} className="text-xs">{movementLabel}</span>
										))
									: null}
							</div>
						</div>
					);
				}),
			)}
		</div>
	);
}

export default ChessboardGrid;
