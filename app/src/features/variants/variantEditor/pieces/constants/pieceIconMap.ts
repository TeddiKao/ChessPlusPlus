import {
	ChessBishopIcon,
	ChessKingIcon,
	ChessKnightIcon,
	ChessPawnIcon,
	ChessQueenIcon,
	ChessRookIcon,
} from "lucide-react";

const pieceIconMap = new Map([
	["Pawn", ChessPawnIcon],
	["Knight", ChessKnightIcon],
	["Bishop", ChessBishopIcon],
	["Rook", ChessRookIcon],
	["Queen", ChessQueenIcon],
	["King", ChessKingIcon],
]);

export { pieceIconMap };
