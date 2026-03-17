import type {
	ChainedMovePath,
	MoveNode,
	PiecesRules,
} from "@/features/variants/common/types/pieceRules";

function getChainedMoveNodeFromPath(
	piecesRules: PiecesRules,
	pieceName: string,
	rootMoveName: string,
	movePath: ChainedMovePath,
): MoveNode[] | void {
	if (!piecesRules[pieceName]) return;

	const rootMove = piecesRules[pieceName].moves.find(
		(move) => move.moveName === rootMoveName,
	);
	if (!rootMove) return;

	let currentNode = rootMove;
	for (const chainedMoveIndex of movePath) {
		const newNode = currentNode.chainedMoves[chainedMoveIndex];
		if (!newNode) return;

		currentNode = newNode;
	}

	return currentNode.chainedMoves;
}

export { getChainedMoveNodeFromPath };
