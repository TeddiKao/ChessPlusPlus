import api from "@/app/api";
import type { MovementRules } from "@/features/variants/common/types/movementRules";
import type { PieceRuleset } from "@/features/variants/common/types/pieceRules";

type LegalMoveDisplayRequestBody = {
    pieceName: string;
    currentPos: [number, number];
    gameState: [[number, number], string][];
    pieceRuleset: PieceRuleset;
    movementRules: MovementRules;
}

type LegalMoveDisplayResponseBody = Record<string, [number, number][]>;

async function displayLegalMoves(request: LegalMoveDisplayRequestBody): Promise<LegalMoveDisplayResponseBody> {
    try {
        const response = await api.post("generate-legal-moves", {
            pieceName: request.pieceName,
            currentPos: request.currentPos,
            gameState: request.gameState,
            pieceRuleset: request.pieceRuleset,
            movementRules: request.movementRules
        })

        return response.data;
    } catch (error) {
        console.log(error);
        return {};
    }
}

export { displayLegalMoves };