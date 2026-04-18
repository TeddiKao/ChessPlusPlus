import type {
	PieceOwnershipRules,
	SetupRules,
} from "@/features/variants/common/types/setupRules";

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
const defaultStartingPosition: StartingPosition = new TupleKeyedMap<[number, number], string>([
	[[0, 0], "white_rook"],
	[[0, 1], "white_knight"],
	[[0, 2], "white_bishop"],
	[[0, 3], "white_queen"],
	[[0, 4], "white_king"],
	[[0, 5], "white_bishop"],
	[[0, 6], "white_knight"],
	[[0, 7], "white_rook"],
	[[1, 0], "white_pawn"],
	[[1, 1], "white_pawn"],
	[[1, 2], "white_pawn"],
	[[1, 3], "white_pawn"],
	[[1, 4], "white_pawn"],
	[[1, 5], "white_pawn"],
	[[1, 6], "white_pawn"],
	[[1, 7], "white_pawn"],
	[[7, 0], "black_rook"],
	[[7, 1], "black_knight"],
	[[7, 2], "black_bishop"],
	[[7, 3], "black_queen"],
	[[7, 4], "black_king"],
	[[7, 5], "black_bishop"],
	[[7, 6], "black_knight"],
	[[7, 7], "black_rook"],
	[[6, 0], "black_pawn"],
	[[6, 1], "black_pawn"],
	[[6, 2], "black_pawn"],
	[[6, 3], "black_pawn"],
	[[6, 4], "black_pawn"],
	[[6, 5], "black_pawn"],
	[[6, 6], "black_pawn"],
	[[6, 7], "black_pawn"],
]);

const defaultSetupRules: SetupRules = {
	pieceOwnership: defaultPieceOwnershipRules,
	boardXSize: 8,
	boardYSize: 8,
	startingPosition: defaultStartingPosition,
};

export { defaultSetupRules };
