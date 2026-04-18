import { TupleKeyedMap } from "@itwin/core-bentley";

type StartingPosition = TupleKeyedMap<[number, number], string>;

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
