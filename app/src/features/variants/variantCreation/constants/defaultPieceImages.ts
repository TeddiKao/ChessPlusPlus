import type { PieceImage } from "@/features/variants/common/types/pieceImages";

import whitePawnSvg from "@/features/variants/variantCreation/assets/white_pawn?raw";
import blackPawnSvg from "@/features/variants/variantCreation/assets/black_pawn?raw";
import whiteQueenSvg from "@/features/variants/variantCreation/assets/white_queen?raw";
import blackQueenSvg from "@/features/variants/variantCreation/assets/black_queen?raw";
import whiteRookSvg from "@/features/variants/variantCreation/assets/white_rook?raw";
import blackRookSvg from "@/features/variants/variantCreation/assets/black_rook?raw";
import whiteBishopSvg from "@/features/variants/variantCreation/assets/white_bishop?raw";
import blackBishopSvg from "@/features/variants/variantCreation/assets/black_bishop?raw";
import whiteKnightSvg from "@/features/variants/variantCreation/assets/white_knight?raw";
import blackKnightSvg from "@/features/variants/variantCreation/assets/black_knight?raw";
import whiteKingSvg from "@/features/variants/variantCreation/assets/white_king?raw";
import blackKingSvg from "@/features/variants/variantCreation/assets/black_king?raw";

const defaultPieceImages: Record<string, PieceImage> = {
	white_pawn: {
		image: new Blob([whitePawnSvg], { type: "image/svg+xml" }),
	},
	black_pawn: {
		image: new Blob([blackPawnSvg], { type: "image/svg+xml" }),
	},
	white_queen: {
		image: new Blob([whiteQueenSvg], { type: "image/svg+xml" }),
	},
	black_queen: {
		image: new Blob([blackQueenSvg], { type: "image/svg+xml" }),
	},
	white_rook: {
		image: new Blob([whiteRookSvg], { type: "image/svg+xml" }),
	},
	black_rook: {
		image: new Blob([blackRookSvg], { type: "image/svg+xml" }),
	},
	white_bishop: {
		image: new Blob([whiteBishopSvg], { type: "image/svg+xml" }),
	},
	black_bishop: {
		image: new Blob([blackBishopSvg], { type: "image/svg+xml" }),
	},
	white_knight: {
		image: new Blob([whiteKnightSvg], { type: "image/svg+xml" }),
	},
	black_knight: {
		image: new Blob([blackKnightSvg], { type: "image/svg+xml" }),
	},
	white_king: {
		image: new Blob([whiteKingSvg], { type: "image/svg+xml" }),
	},
	black_king: {
		image: new Blob([blackKingSvg], { type: "image/svg+xml" }),
	},
};

export { defaultPieceImages };