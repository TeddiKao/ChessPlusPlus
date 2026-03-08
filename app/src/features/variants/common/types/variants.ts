type PieceOwnershipRules = {
	white: string[];
	black: string[];
};

type SquareInfo = {
	pieceName: string;
	xPos: number;
	yPos: number;
};

type SetupRules = {
	pieceOwnership: PieceOwnershipRules;
	boardXSize: number;
	boardYSize: number;

	startingPosition: SquareInfo[];
};

type VariantInfo = {
	setupRules: SetupRules;
};

export type { VariantInfo };
