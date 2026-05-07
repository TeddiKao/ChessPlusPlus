import type { GameStateMap } from "@/features/variants/common/types/setupRules";

function serialiseGameState(gameState: GameStateMap) {
	return Array.from(gameState);
}

export { serialiseGameState };
