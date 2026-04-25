import type {
	PieceOwnershipRules,
	SetupRules,
	GameState,
} from "@/features/variants/common/types/setupRules";
import { TupleKeyedMap } from "@itwin/core-bentley";

const defaultPieceOwnershipRules: PieceOwnershipRules = {
	white: [
		"white_pawn",
		"white_queen",
		"white_rook",
		"white_bishop",
		"white_knight",
		"white_king",
	],
	black: [
		"black_pawn",
		"black_queen",
		"black_rook",
		"black_bishop",
		"black_knight",
		"black_king",
	],
};
const defaultStartingPosition: GameState = new TupleKeyedMap<[number, number], string>([
	[[0, 0], "white_rook"],
	[[1, 0], "white_knight"],
	[[2, 0], "white_bishop"],
	[[3, 0], "white_queen"],
	[[4, 0], "white_king"],
	[[5, 0], "white_bishop"],
	[[6, 0], "white_knight"],
	[[7, 0], "white_rook"],

	[[0, 1], "white_pawn"],
	[[1, 1], "white_pawn"],
	[[2, 1], "white_pawn"],
	[[3, 1], "white_pawn"],
	[[4, 1], "white_pawn"],
	[[5, 1], "white_pawn"],
	[[6, 1], "white_pawn"],
	[[7, 1], "white_pawn"],

	[[0, 7], "black_rook"],
	[[1, 7], "black_knight"],
	[[2, 7], "black_bishop"],
	[[3, 7], "black_queen"],
	[[4, 7], "black_king"],
	[[5, 7], "black_bishop"],
	[[6, 7], "black_knight"],
	[[7, 7], "black_rook"],

	[[0, 6], "black_pawn"],
	[[1, 6], "black_pawn"],
	[[2, 6], "black_pawn"],
	[[3, 6], "black_pawn"],
	[[4, 6], "black_pawn"],
	[[5, 6], "black_pawn"],
	[[6, 6], "black_pawn"],
	[[7, 6], "black_pawn"],
]);

const defaultSetupRules: SetupRules = {
	pieceOwnership: defaultPieceOwnershipRules,
	boardXSize: 8,
	boardYSize: 8,
	startingPosition: defaultStartingPosition,
};

export { defaultSetupRules };
