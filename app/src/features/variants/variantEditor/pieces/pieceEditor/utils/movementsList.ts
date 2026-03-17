import type { PiecesRules } from "@/features/variants/common/types/pieceRules";

function getMovementsListForPiece(pieces: PiecesRules, pieceName: string) {
	if (!pieces[pieceName]) return [];

	const movementsList: string[] = [];
	for (const movementInfo of pieces[pieceName].moves) {
		movementsList.push(movementInfo.moveName);

		let currentMoveNode = movementInfo;
		while (currentMoveNode.chainedMoves.length > 0) {
			movementsList.push(currentMoveNode.chainedMoves[0].moveName);
			currentMoveNode = currentMoveNode.chainedMoves[0];
		}
	}

	return movementsList;
}

export { getMovementsListForPiece };
