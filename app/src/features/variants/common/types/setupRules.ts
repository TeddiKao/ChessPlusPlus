type StartingPosition = Map<number, Map<number, string>>;

type PieceOwnershipRules = {
	white: string[];
	black: string[];
};

type SetupRules = {
	pieceOwnership: PieceOwnershipRules;
	boardXSize: number;
	boardYSize: number;

	startingPosition: StartingPosition;
};

export type { SetupRules, PieceOwnershipRules, StartingPosition };
