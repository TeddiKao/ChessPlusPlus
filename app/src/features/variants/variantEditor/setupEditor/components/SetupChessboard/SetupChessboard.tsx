import usePieceImagesStore from "@/features/variants/common/stores/pieceImages";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import { generateNumberSequence } from "@/features/variants/variantEditor/common/utils/boardGeneration";
import Square from "@/features/variants/variantEditor/setupEditor/components/SetupChessboard/Square";
import { TupleKeyedMap } from "@itwin/core-bentley";

function SetupChessboard() {
	const { images } = usePieceImagesStore();
	const { currentVariantId, setupRulesDraft, pieceRulesetDraft } =
		useVariantDraftStore();

	if (!setupRulesDraft) return null;
	if (!pieceRulesetDraft) return null;
	if (!images) return null;
	if (!currentVariantId) return null;

	const boardXSize = setupRulesDraft.boardXSize;
	const boardYSize = setupRulesDraft.boardYSize;

	const boardStateMap = new TupleKeyedMap<[number, number], string>(
		setupRulesDraft.startingPosition,
	);

	const ranks = generateNumberSequence(boardYSize).reverse();
	const files = generateNumberSequence(boardXSize);

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
		<div className="grid grid-cols-8 aspect-square w-full max-w-md">
			{ranks.map((rank) =>
				files.map((file) => {
					const foundSquare = boardStateMap.get([file, rank]);
					const imageId =
						pieceRulesetDraft[foundSquare ?? ""]?.imageId;

					const imageComponent = imageId ? renderPieceImage(imageId, foundSquare ?? "") : null;

					return (
						<Square
							file={file}
							rank={rank}
							imageComponent={imageComponent}
						/>
					);
				}),
			)}
		</div>
	);
}

export default SetupChessboard;
