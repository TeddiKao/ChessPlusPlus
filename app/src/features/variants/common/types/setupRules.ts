type PieceOwnershipRules = {
	white: string[];
	black: string[];
};

type SetupRules = {
	pieceOwnership: PieceOwnershipRules;
	boardXSize: number;
	boardYSize: number;

	startingPosition: Map<[number, number], string>;
};

export type { SetupRules, PieceOwnershipRules };
