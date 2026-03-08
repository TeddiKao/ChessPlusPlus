type SquareInfo = {
	pieceName: string;
	xPos: number;
	yPos: number;
};

type PieceOwnershipRules = {
	white: string[];
	black: string[];
};

type SetupRules = {
	pieceOwnership: PieceOwnershipRules;
	boardXSize: number;
	boardYSize: number;

	startingPosition: SquareInfo[];
};

export type { SetupRules, PieceOwnershipRules, SquareInfo };
