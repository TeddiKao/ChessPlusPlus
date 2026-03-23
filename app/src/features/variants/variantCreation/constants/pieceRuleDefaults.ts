import type {
	PieceRules,
	PieceRuleset,
} from "@/features/variants/common/types/pieceRules";

const queenRules: PieceRules = {
	moveset: [
		{
			moveName: "north",
			chainedMoves: [],
		},
		{
			moveName: "south",
			chainedMoves: [],
		},
		{
			moveName: "east",
			chainedMoves: [],
		},
		{
			moveName: "west",
			chainedMoves: [],
		},
		{
			moveName: "northeast",
			chainedMoves: [],
		},
		{
			moveName: "northwest",
			chainedMoves: [],
		},
		{
			moveName: "southeast",
			chainedMoves: [],
		},
		{
			moveName: "southwest",
			chainedMoves: [],
		},
	],
};

const rookRules: PieceRules = {
	moveset: [
		{
			moveName: "north",
			chainedMoves: [],
		},
		{
			moveName: "south",
			chainedMoves: [],
		},
		{
			moveName: "east",
			chainedMoves: [],
		},
		{
			moveName: "west",
			chainedMoves: [],
		},
	],
};
const bishopRules: PieceRules = {
	moveset: [
		{
			moveName: "northeast",
			chainedMoves: [],
		},
		{
			moveName: "northwest",
			chainedMoves: [],
		},
		{
			moveName: "southeast",
			chainedMoves: [],
		},
		{
			moveName: "southwest",
			chainedMoves: [],
		},
	],
};
const knightRules: PieceRules = {
	moveset: [
		{
			moveName: "knight_0201",
			chainedMoves: [],
		},
		{
			moveName: "knight_02m1",
			chainedMoves: [],
		},
		{
			moveName: "knight_m201",
			chainedMoves: [],
		},
		{
			moveName: "knight_m2m1",
			chainedMoves: [],
		},
		{
			moveName: "knight_0102",
			chainedMoves: [],
		},
		{
			moveName: "knight_m102",
			chainedMoves: [],
		},
		{
			moveName: "knight_01m2",
			chainedMoves: [],
		},
		{
			moveName: "knight_m1m2",
			chainedMoves: [],
		}
	],
};

const kingRules: PieceRules = {
	moveset: [
		{
			moveName: "north_1",
			chainedMoves: [],
		},
		{
			moveName: "south_1",
			chainedMoves: [],
		},
		{
			moveName: "east_1",
			chainedMoves: [],
		},
		{
			moveName: "west_1",
			chainedMoves: [],
		},
		{
			moveName: "northeast_1",
			chainedMoves: [],
		},
		{
			moveName: "northwest_1",
			chainedMoves: [],
		},
		{
			moveName: "southeast_1",
			chainedMoves: [],
		},
		{
			moveName: "southwest_1",
			chainedMoves: [],
		},
	],
};

const defaultPieceRuleset: PieceRuleset = {
	whitePawn: {
		moveset: [
			{
				moveName: "white_pawn_forward",
				chainedMoves: [
					["white_pawn_double_step"]
				],
			},
			{
				moveName: "white_pawn_capture_east",
				chainedMoves: [],
			},
			{
				moveName: "white_pawn_capture_west",
				chainedMoves: [],
			}
		]
	},

	blackPawn: {
		moveset: [
			{
				moveName: "black_pawn_forward",
				chainedMoves: [
					["black_forward_double_step"]
				],
			},
			{
				moveName: "black_pawn_capture_east",
				chainedMoves: [],
			},
			{
				moveName: "black_pawn_capture_west",
				chainedMoves: [],
			}
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
