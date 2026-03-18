import type {
	PieceOwnershipRules,
	SetupRules,
	SquareInfo,
} from "@/features/variants/common/types/setupRules";

const defaultPieceOwnershipRules: PieceOwnershipRules = {
	white: [
		"white_Pawn",
		"white_Queen",
		"white_Rook",
		"white_Bishop",
		"white_Knight",
		"white_King",
	],
	black: [
		"black_Pawn",
		"black_Queen",
		"black_Rook",
		"black_Bishop",
		"black_Knight",
		"black_King",
	],
};
const defaultStartingPosition: SquareInfo[] = [
	{
		pieceName: "white_pawn",
		xPos: 0,
		yPos: 1,
	},
	{
		pieceName: "white_pawn",
		xPos: 1,
		yPos: 1,
	},
	{
		pieceName: "white_pawn",
		xPos: 2,
		yPos: 1,
	},
	{
		pieceName: "white_pawn",
		xPos: 3,
		yPos: 1,
	},
	{
		pieceName: "white_pawn",
		xPos: 4,
		yPos: 1,
	},
	{
		pieceName: "white_pawn",
		xPos: 5,
		yPos: 1,
	},
	{
		pieceName: "white_pawn",
		xPos: 6,
		yPos: 1,
	},
	{
		pieceName: "white_pawn",
		xPos: 7,
		yPos: 1,
	},
	{
		pieceName: "black_pawn",
		xPos: 0,
		yPos: 6,
	},
	{
		pieceName: "black_pawn",
		xPos: 1,
		yPos: 6,
	},
	{
		pieceName: "black_pawn",
		xPos: 2,
		yPos: 6,
	},
	{
		pieceName: "black_pawn",
		xPos: 3,
		yPos: 6,
	},
	{
		pieceName: "black_pawn",
		xPos: 4,
		yPos: 6,
	},
	{
		pieceName: "black_pawn",
		xPos: 5,
		yPos: 6,
	},
	{
		pieceName: "black_pawn",
		xPos: 6,
		yPos: 6,
	},
	{
		pieceName: "black_pawn",
		xPos: 7,
		yPos: 6,
	},
	{
		pieceName: "white_queen",
		xPos: 4,
		yPos: 0,
	},
	{
		pieceName: "black_queen",
		xPos: 4,
		yPos: 7,
	},
	{
		pieceName: "white_rook",
		xPos: 0,
		yPos: 0,
	},
	{
		pieceName: "white_rook",
		xPos: 7,
		yPos: 0,
	},
	{
		pieceName: "black_rook",
		xPos: 0,
		yPos: 7,
	},
	{
		pieceName: "black_rook",
		xPos: 7,
		yPos: 7,
	},
	{
		pieceName: "white_bishop",
		xPos: 2,
		yPos: 0,
	},
	{
		pieceName: "white_bishop",
		xPos: 5,
		yPos: 0,
	},
	{
		pieceName: "black_bishop",
		xPos: 2,
		yPos: 7,
	},
	{
		pieceName: "black_bishop",
		xPos: 5,
		yPos: 7,
	},
	{
		pieceName: "white_knight",
		xPos: 1,
		yPos: 0,
	},
	{
		pieceName: "white_knight",
		xPos: 6,
		yPos: 0,
	},
	{
		pieceName: "black_knight",
		xPos: 1,
		yPos: 7,
	},
	{
		pieceName: "black_knight",
		xPos: 6,
		yPos: 7,
	},
	{
		pieceName: "white_king",
		xPos: 3,
		yPos: 0,
	},
	{
		pieceName: "black_king",
		xPos: 3,
		yPos: 7,
	},
];
const defaultSetupRules: SetupRules = {
	pieceOwnership: defaultPieceOwnershipRules,
	boardXSize: 8,
	boardYSize: 8,
	startingPosition: defaultStartingPosition,
};

export { defaultSetupRules };
