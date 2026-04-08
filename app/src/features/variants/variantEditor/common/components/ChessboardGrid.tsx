import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import {
	generateAlphabetSequence,
	generateNumberSequence,
} from "@/features/variants/variantEditor/common/utils/boardGeneration";

function ChessboardGrid() {
	const { setupRulesDraft } = useVariantDraftStore();
	if (!setupRulesDraft) return null;

	const boardXSize = setupRulesDraft.boardXSize;
	const boardYSize = setupRulesDraft.boardYSize;

	const ranks = generateNumberSequence(boardYSize).reverse();
	const files = generateAlphabetSequence(boardXSize);

	return (
		<div className="grid grid-cols-8 aspect-square max-w-md">
			{ranks.map((rank) =>
				files.map((file) => {
					const isDark = (rank + files.indexOf(file)) % 2 === 0;

					return (
						<div
							key={file}
							className={`${isDark ? "bg-chessboard-square-dark" : "bg-chessboard-square-light"}`}
						></div>
					);
				}),
			)}
		</div>
	);
}

export default ChessboardGrid;
