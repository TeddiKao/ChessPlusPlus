type MovementConditions = "has_not_moved";
type MoveStopConditions = "inside_piece";

type PieceMoveDefinition = {
	moveX: number;
	moveY: number;
	range: number | "inf";
	moveStopConditions: MoveStopConditions[];
};

type PieceMovementRules = {
	forMovement: boolean;
	forCapture: boolean;

	conditions: MovementConditions[];
	validMove: boolean;

	moveDefinition: PieceMoveDefinition;
	chainedMoves: PieceMovementRules[];
};

type PieceRules = {
	moves: PieceMovementRules[];
};

type PiecesRules = Record<string, PieceRules>;

export type { PiecesRules, PieceMovementRules, PieceMoveDefinition };
