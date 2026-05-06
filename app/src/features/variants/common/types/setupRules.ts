import { TupleKeyedMap } from "@itwin/core-bentley";

type GameStateMap = TupleKeyedMap<[number, number], string>;

type PieceOwnershipRules = {
	white: string[];
	black: string[];
};

type BaseSetupRules = {
	pieceOwnership: PieceOwnershipRules;
	boardXSize: number;
	boardYSize: number;
};

type SetupRules = BaseSetupRules & {
	startingPosition: GameStateMap;
};

type SetupRules2DArray = BaseSetupRules & {
	startingPosition: [[number, number], string][];
};

export type {
	SetupRules,
	PieceOwnershipRules,
	GameStateMap,
	SetupRules2DArray,
};
