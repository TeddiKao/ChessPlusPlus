type MoveNode = {
	moveName: string;
	chainedMoves: MoveNode[];
};

type ChainedMovePath = number[];

type PieceRules = {
	moves: MoveNode[];
};

type PiecesRules = Record<string, PieceRules>;

export type { PiecesRules, PieceRules, ChainedMovePath, MoveNode };
