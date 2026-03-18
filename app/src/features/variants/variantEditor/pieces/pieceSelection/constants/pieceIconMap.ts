import {
	ChessBishopIcon,
	ChessKingIcon,
	ChessKnightIcon,
	ChessPawnIcon,
	ChessQueenIcon,
	ChessRookIcon,
} from "lucide-react";

const pieceIconMap = new Map([
	["pawn", ChessPawnIcon],
	["knight", ChessKnightIcon],
	["bishop", ChessBishopIcon],
	["rook", ChessRookIcon],
	["queen", ChessQueenIcon],
	["king", ChessKingIcon],
]);

export { pieceIconMap };
