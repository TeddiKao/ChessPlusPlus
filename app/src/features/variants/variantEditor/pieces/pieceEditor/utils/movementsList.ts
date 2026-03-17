import type {
	ChainedMovePath,
	MoveNode,
	PieceRules,
} from "@/features/variants/common/types/pieceRules";

function loopOverChainedMoves(
	chainedMoves: MoveNode[],
	movementsList: { moveName: string; path: ChainedMovePath }[],
	movePath: number[],
) {
	for (const movementInfo of chainedMoves) {
		const index = chainedMoves.findIndex(
			(move) => move.moveName === movementInfo.moveName,
		);

		const updatedMovePath = [...movePath, index];

		movementsList.push({
			moveName: movementInfo.moveName,
			path: updatedMovePath,
		});

		loopOverChainedMoves(
			movementInfo.chainedMoves,
			movementsList,
			updatedMovePath,
		);
	}
}

function getMovementsListForPiece(pieceRules: PieceRules) {
	const movementsList: { moveName: string; path: ChainedMovePath }[] = [];

	for (const movementInfo of pieceRules.moves) {
		const rootIndex = pieceRules.moves.findIndex(
			(move) => move.moveName === movementInfo.moveName,
		);
		const movePath: number[] = [rootIndex];

		let chainedMoves: MoveNode[] | null = null;

		movementsList.push({ moveName: movementInfo.moveName, path: movePath });
		chainedMoves = movementInfo.chainedMoves;

		loopOverChainedMoves(chainedMoves, movementsList, movePath);
	}

	return movementsList;
}

export { getMovementsListForPiece };
