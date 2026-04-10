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
const defaultStartingPosition: Map<number, Map<number, string>> = new Map([
	[0, new Map([
		[0, "white_rook"],
		[1, "white_knight"],
		[2, "white_bishop"],
		[3, "white_queen"],
		[4, "white_king"],
		[5, "white_bishop"],
		[6, "white_knight"],
		[7, "white_rook"],
	])],
	[1, new Map([
		[0, "white_pawn"],
		[1, "white_pawn"],
		[2, "white_pawn"],
		[3, "white_pawn"],
		[4, "white_pawn"],
		[5, "white_pawn"],
		[6, "white_pawn"],
		[7, "white_pawn"],
	])],
	[7, new Map([
		[0, "black_rook"],
		[1, "black_knight"],
		[2, "black_bishop"],
		[3, "black_queen"],
		[4, "black_king"],
		[5, "black_bishop"],
		[6, "black_knight"],
		[7, "black_rook"],
	])],
	[6, new Map([
		[0, "black_pawn"],
		[1, "black_pawn"],
		[2, "black_pawn"],
		[3, "black_pawn"],
		[4, "black_pawn"],
		[5, "black_pawn"],
		[6, "black_pawn"],
		[7, "black_pawn"],
	])],
]);

const defaultSetupRules: SetupRules = {
	pieceOwnership: defaultPieceOwnershipRules,
	boardXSize: 8,
	boardYSize: 8,
	startingPosition: defaultStartingPosition,
};

export { defaultSetupRules };
