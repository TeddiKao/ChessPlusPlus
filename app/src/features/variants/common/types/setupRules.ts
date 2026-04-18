import { TupleKeyedMap } from "@itwin/core-bentley";

type PositionState = TupleKeyedMap<[number, number], string>;

type PieceOwnershipRules = {
	white: string[];
	black: string[];
};

type SetupRules = {
	pieceOwnership: PieceOwnershipRules;
	boardXSize: number;
	boardYSize: number;

	startingPosition: PositionState;
};

export type { SetupRules, PieceOwnershipRules, PositionState };
