import type {
	PieceRules,
	PiecesRules,
} from "@/features/variants/common/types/pieceRules";

const queenRules: PieceRules = {
	moves: [
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
	moves: [
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
	moves: [
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

const knightRules = {
	moves: [
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
		},
	],
};
const kingRules = {
	moves: [
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
const defaultPieceRules: PiecesRules = {
	white_Pawn: {
		moves: [
			{
				moveName: "white_pawn_forward",
				chainedMoves: [
					{
						moveName: "white_forward_double_step",
						chainedMoves: [],
					},
				],
			},
			{
				moveName: "white_pawn_capture_east",
				chainedMoves: [],
			},
			{
				moveName: "white_pawn_capture_west",
				chainedMoves: [],
			},
		],
	},

	black_Pawn: {
		moves: [
			{
				moveName: "black_pawn_forward",
				chainedMoves: [
					{
						moveName: "black_forward_double_step",
						chainedMoves: [],
					},
				],
			},
			{
				moveName: "black_pawn_capture_east",
				chainedMoves: [],
			},
			{
				moveName: "black_pawn_capture_west",
				chainedMoves: [],
			},
		],
	},

	white_Queen: queenRules,
	black_Queen: queenRules,

	white_Rook: rookRules,
	black_Rook: rookRules,

	white_Bishop: bishopRules,
	black_Bishop: bishopRules,

	white_Knight: knightRules,
	black_Knight: knightRules,

	white_King: kingRules,
	black_King: kingRules,
};

export { defaultPieceRules };
