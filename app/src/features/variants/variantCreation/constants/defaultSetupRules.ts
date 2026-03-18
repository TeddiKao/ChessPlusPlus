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
		pieceName: "white_Pawn",
		xPos: 0,
		yPos: 1,
	},
	{
		pieceName: "white_Pawn",
		xPos: 1,
		yPos: 1,
	},
	{
		pieceName: "white_Pawn",
		xPos: 2,
		yPos: 1,
	},
	{
		pieceName: "white_Pawn",
		xPos: 3,
		yPos: 1,
	},
	{
		pieceName: "white_Pawn",
		xPos: 4,
		yPos: 1,
	},
	{
		pieceName: "white_Pawn",
		xPos: 5,
		yPos: 1,
	},
	{
		pieceName: "white_Pawn",
		xPos: 6,
		yPos: 1,
	},
	{
		pieceName: "white_Pawn",
		xPos: 7,
		yPos: 1,
	},
	{
		pieceName: "white_Pawn",
		xPos: 0,
		yPos: 6,
	},
	{
		pieceName: "black_Pawn",
		xPos: 1,
		yPos: 6,
	},
	{
		pieceName: "black_Pawn",
		xPos: 2,
		yPos: 6,
	},
	{
		pieceName: "black_Pawn",
		xPos: 3,
		yPos: 6,
	},
	{
		pieceName: "black_Pawn",
		xPos: 4,
		yPos: 6,
	},
	{
		pieceName: "black_Pawn",
		xPos: 5,
		yPos: 6,
	},
	{
		pieceName: "black_Pawn",
		xPos: 6,
		yPos: 6,
	},
	{
		pieceName: "black_Pawn",
		xPos: 7,
		yPos: 6,
	},
	{
		pieceName: "white_Queen",
		xPos: 4,
		yPos: 0,
	},
	{
		pieceName: "black_Queen",
		xPos: 4,
		yPos: 7,
	},
	{
		pieceName: "white_Rook",
		xPos: 0,
		yPos: 0,
	},
	{
		pieceName: "white_Rook",
		xPos: 7,
		yPos: 0,
	},
	{
		pieceName: "black_Rook",
		xPos: 0,
		yPos: 7,
	},
	{
		pieceName: "black_Rook",
		xPos: 7,
		yPos: 7,
	},
	{
		pieceName: "white_Bishop",
		xPos: 2,
		yPos: 0,
	},
	{
		pieceName: "white_Bishop",
		xPos: 5,
		yPos: 0,
	},
	{
		pieceName: "black_Bishop",
		xPos: 2,
		yPos: 7,
	},
	{
		pieceName: "black_Bishop",
		xPos: 5,
		yPos: 7,
	},
	{
		pieceName: "white_Knight",
		xPos: 1,
		yPos: 0,
	},
	{
		pieceName: "white_Knight",
		xPos: 6,
		yPos: 0,
	},
	{
		pieceName: "black_Knight",
		xPos: 1,
		yPos: 7,
	},
	{
		pieceName: "black_Knight",
		xPos: 6,
		yPos: 7,
	},
	{
		pieceName: "white_King",
		xPos: 3,
		yPos: 0,
	},
	{
		pieceName: "black_King",
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
