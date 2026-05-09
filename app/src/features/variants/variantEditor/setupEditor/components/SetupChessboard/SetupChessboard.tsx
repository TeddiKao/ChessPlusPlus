import usePieceImagesStore from "@/features/variants/common/stores/pieceImages";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import {
	generateNumberSequence,
} from "@/features/variants/variantEditor/common/utils/boardGeneration";
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
					const isDark = (rank + files.indexOf(file)) % 2 === 0;

					const fileNumber = files.indexOf(file);

					const foundSquare = boardStateMap.get([fileNumber, rank]);
					const imageId =
						pieceRulesetDraft[foundSquare ?? ""]?.imageId;

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
						</div>
					);
				}),
			)}
		</div>
	);
}

export default SetupChessboard;