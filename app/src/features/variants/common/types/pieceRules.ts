type PieceMovementRules = {
	moveName: string;
	chainedMoves: string[];
};

type PieceRules = {
	moves: PieceMovementRules[];
};

type PiecesRules = Record<string, PieceRules>;

export type { PiecesRules, PieceMovementRules, PieceRules };
