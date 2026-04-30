import { TupleKeyedMap } from "@itwin/core-bentley";

type GameState = TupleKeyedMap<[number, number], string>;

type PieceOwnershipRules = {
	white: string[];
	black: string[];
};

type BaseSetupRules = {
	pieceOwnership: PieceOwnershipRules;
	boardXSize: number;
	boardYSize: number;
}

type SetupRules = BaseSetupRules & {
	startingPosition: GameState;
};

type SerialisedSetupRules = BaseSetupRules & {
	startingPosition: [[number, number], string][];
}

export type { SetupRules, PieceOwnershipRules, GameState, SerialisedSetupRules };
