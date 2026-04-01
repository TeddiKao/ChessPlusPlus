type ChainedMoveSequence = { moveName: string; validMove: boolean }[];

type RegularMove = {
	moveName: string;
};

type PieceRules = {
	moveset: (RegularMove | ChainedMoveSequence)[];
	imageId?: string;
};

type PieceRuleset = Record<string, PieceRules>;

export type { PieceRuleset, RegularMove, PieceRules, ChainedMoveSequence };
