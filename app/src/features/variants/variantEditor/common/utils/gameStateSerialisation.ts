import type { GameState } from "@/features/variants/common/types/setupRules";

function serialiseGameState(gameState: GameState) {
    return Array.from(gameState);
}

export { serialiseGameState }