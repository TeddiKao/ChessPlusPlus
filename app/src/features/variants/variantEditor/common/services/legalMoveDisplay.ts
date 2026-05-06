import api from "@/app/api";
import type { MovementRules } from "@/features/variants/common/types/movementRules";
import type { PieceRuleset } from "@/features/variants/common/types/pieceRules";
import type { SetupRules2DArray } from "@/features/variants/common/types/setupRules";
import { AxiosError } from "axios";

type LegalMoveDisplayRequestBody = {
	pieceName: string;
	currentPos: [number, number];
	gameState: [[number, number], string][];
	pieceRuleset: PieceRuleset;
	movementRules: MovementRules;
	setupRules: SetupRules2DArray;
};

type LegalMoveDisplayResponseBody = Record<string, [number, number][]>;

async function displayLegalMoves(
	request: LegalMoveDisplayRequestBody,
): Promise<LegalMoveDisplayResponseBody> {
	try {
		const response = await api.post("move-rules/generate-legal-moves/", {
			pieceName: request.pieceName,
			currentPos: request.currentPos,
			gameState: request.gameState,
			pieceRuleset: request.pieceRuleset,
			movementRules: request.movementRules,
			setupRules: request.setupRules,
		});

		return response.data.legalMoves;
	} catch (error) {
		if (error instanceof AxiosError) {
			console.log(error.response);
		}

		return {};
	}
}

export { displayLegalMoves };
