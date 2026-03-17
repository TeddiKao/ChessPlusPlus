type MoveNode = {
	moveName: string;
	chainedMoves: MoveNode[];
};

type PieceMovementRules = {
	moves: MoveNode[];
};

type PieceRules = {
	moves: PieceMovementRules[];
};

type PiecesRules = Record<string, PieceRules>;

export type { PiecesRules, PieceMovementRules, PieceRules };
