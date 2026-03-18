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
	for (let index = 0; index < chainedMoves.length; index++) {
		const movementInfo = chainedMoves[index];

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

	for (let rootIndex = 0; rootIndex < pieceRules.moves.length; rootIndex++) {
		const movementInfo = pieceRules.moves[rootIndex];
		const movePath: number[] = [rootIndex];

		let chainedMoves: MoveNode[] | null = null;

		movementsList.push({ moveName: movementInfo.moveName, path: movePath });
		chainedMoves = movementInfo.chainedMoves;

		loopOverChainedMoves(chainedMoves, movementsList, movePath);
	}

	return movementsList;
}

export { getMovementsListForPiece };
