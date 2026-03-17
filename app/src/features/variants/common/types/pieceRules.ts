type ChainedMove = {
	moveName: string;
	chainedMoves: ChainedMove[];
};

type PieceMovementRules = {
	moveName: string;
	chainedMoves: ChainedMove[];
};

type PieceRules = {
	moves: PieceMovementRules[];
};

type PiecesRules = Record<string, PieceRules>;

export type { PiecesRules, PieceMovementRules, PieceRules };
