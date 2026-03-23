import type {
	PieceRules,
	PieceRuleset,
} from "@/features/variants/common/types/pieceRules";

const queenRules: PieceRules = {
	moveset: [
		{
			moveName: "north",
		},
		{
			moveName: "south",
		},
		{
			moveName: "east",
		},
		{
			moveName: "west",
		},
		{
			moveName: "northeast",
		},
		{
			moveName: "northwest",
		},
		{
			moveName: "southeast",
		},
		{
			moveName: "southwest",
		},
	],
};

const rookRules: PieceRules = {
	moveset: [
		{
			moveName: "north",
		},
		{
			moveName: "south",
		},
		{
			moveName: "east",
		},
		{
			moveName: "west",
		},
	],
};
const bishopRules: PieceRules = {
	moveset: [
		{
			moveName: "northeast",
		},
		{
			moveName: "northwest",
		},
		{
			moveName: "southeast",
		},
		{
			moveName: "southwest",
		},
	],
};
const knightRules: PieceRules = {
	moveset: [
		{
			moveName: "knight_0201",
		},
		{
			moveName: "knight_02m1",
		},
		{
			moveName: "knight_m201",
		},
		{
			moveName: "knight_m2m1",
		},
		{
			moveName: "knight_0102",
		},
		{
			moveName: "knight_m102",
		},
		{
			moveName: "knight_01m2",
		},
		{
			moveName: "knight_m1m2",
		},
	],
};

const kingRules: PieceRules = {
	moveset: [
		{
			moveName: "north_1",
		},
		{
			moveName: "south_1",
		},
		{
			moveName: "east_1",
		},
		{
			moveName: "west_1",
		},
		{
			moveName: "northeast_1",
		},
		{
			moveName: "northwest_1",
		},
		{
			moveName: "southeast_1",
		},
		{
			moveName: "southwest_1",
		},
	],
};

const defaultPieceRuleset: PieceRuleset = {
	whitePawn: {
		moveset: [
			[
				{ moveName: "white_pawn_forward", validMove: true },
				{ moveName: "white_pawn_double_step", validMove: true },
			],
			{
				moveName: "white_pawn_capture_east",
			},
			{
				moveName: "white_pawn_capture_west",
			},
		],
	},

	blackPawn: {
		moveset: [
			[
				{ moveName: "black_pawn_forward", validMove: true },
				{ moveName: "black_forward_double_step", validMove: true },
			],
			{
				moveName: "black_pawn_capture_east",
			},
			{
				moveName: "black_pawn_capture_west",
			},
		],
	},

	whiteQueen: queenRules,
	blackQueen: queenRules,

	whiteRook: rookRules,
	blackRook: rookRules,

	whiteBishop: bishopRules,
	blackBishop: bishopRules,

	whiteKnight: knightRules,
	blackKnight: knightRules,

	whiteKing: kingRules,
	blackKing: kingRules,
};

export { defaultPieceRuleset };
