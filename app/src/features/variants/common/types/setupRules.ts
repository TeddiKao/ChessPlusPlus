import { TupleKeyedMap } from "@itwin/core-bentley";

type GameState = TupleKeyedMap<[number, number], string>;

type PieceOwnershipRules = {
	white: string[];
	black: string[];
};

type SetupRules = {
	pieceOwnership: PieceOwnershipRules;
	boardXSize: number;
	boardYSize: number;

	startingPosition: GameState;
};

export type { SetupRules, PieceOwnershipRules, GameState };
