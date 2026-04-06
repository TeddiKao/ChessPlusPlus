type ChainedMoveNodeInput = {
	moveName: string;
	validMove: boolean;
};

type ChainedMoveNode = ChainedMoveNodeInput & {
	nodeId: string;
}

type ChainedMoveSequence = ChainedMoveNode[];

type RegularMove = {
	moveName: string;
};

type PieceRules = {
	moveset: (RegularMove | ChainedMoveSequence)[];
	imageId?: string;
};

type PieceRuleset = Record<string, PieceRules>;

export type { PieceRuleset, RegularMove, PieceRules, ChainedMoveSequence, ChainedMoveNode };
