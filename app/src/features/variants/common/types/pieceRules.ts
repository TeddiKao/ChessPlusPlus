type PieceMove = {
	moveName: string;
	chainedMoves: string[][];
};

type PieceRules = {
	moveset: PieceMove[];
};

type PieceRuleset = Record<string, PieceRules>;

export type { PieceRuleset, PieceMove, PieceRules };
