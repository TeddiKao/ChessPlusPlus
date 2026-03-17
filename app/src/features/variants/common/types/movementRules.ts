type MovementConditions = "has_not_moved";
type MoveStopConditions = "inside_piece";

type PieceMoveDefinition = {
	moveX: number;
	moveY: number;
	range: number | "inf";
	moveStopConditions: MoveStopConditions[];
};

type MovementRules = {
	forMovement: boolean;
	forCapture: boolean;

	conditions: MovementConditions[];
	validMove: boolean;

	moveDefinition: PieceMoveDefinition;
};

export type {
	MovementConditions,
	MoveStopConditions,
	MovementRules,
	PieceMoveDefinition,
};
