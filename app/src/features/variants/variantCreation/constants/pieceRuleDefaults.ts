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
	imageId: "white_queen",
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
	imageId: "white_rook",
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
	imageId: "white_bishop",
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
	imageId: "white_king",
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
	imageId: "black_pawn",
};

const defaultPieceRuleset: PieceRuleset = {
	white_pawn: {
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
		imageId: "white_pawn",
	},

	black_pawn: {
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
		imageId: "black_pawn",
	},

	white_queen: queenRules,
	black_queen: queenRules,

	white_rook: rookRules,
	black_rook: rookRules,

	white_bishop: bishopRules,
	black_bishop: bishopRules,

	white_knight: knightRules,
	black_knight: knightRules,

	white_king: kingRules,
	black_king: kingRules,
};

export { defaultPieceRuleset };
