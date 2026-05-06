import { TupleKeyedMap } from "@itwin/core-bentley";

type GameStateMap = TupleKeyedMap<[number, number], string>;
type GameState2DArray = [[number, number], string][];

type PieceOwnershipRules = {
	white: string[];
	black: string[];
};

type SetupRules = {
	pieceOwnership: PieceOwnershipRules;
	boardXSize: number;
	boardYSize: number;
	startingPosition: GameState2DArray; 
};

export type { SetupRules, PieceOwnershipRules, GameStateMap };
