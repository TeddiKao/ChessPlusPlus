import type { PieceOwnershipRules } from "@/features/variants/common/types/setupRules";
import _ from "lodash";

type PiecesList = {
	default: string[];
	custom: string[];
};

const defaultPiecesList: string[] = [
	"pawn",
	"queen",
	"rook",
	"bishop",
	"knight",
	"king",
];

function getPiecesList(pieceOwnershipRules: PieceOwnershipRules): PiecesList {
	const defaultPieces: Set<string> = new Set();
	const customPieces: Set<string> = new Set();

	for (const piece of [
		...pieceOwnershipRules.white,
		...pieceOwnershipRules.black,
	]) {
		const [, pieceName] = piece.split("_");
		if (!defaultPiecesList.includes(pieceName.toLowerCase())) {
			customPieces.add(_.capitalize(pieceName));
		} else {
			defaultPieces.add(_.capitalize(pieceName));
		}
	}

	return {
		default: Array.from(defaultPieces),
		custom: Array.from(customPieces),
	};
}

export { getPiecesList };
