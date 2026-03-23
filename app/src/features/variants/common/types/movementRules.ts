type MoveConditions = "has_not_moved";
type MoveStopConditions = "inside_piece";

type MovementRule = {
	forMovement: boolean;
	forCapture: boolean;
	conditions: MoveConditions[];

	moveDefinition: {
		moveX: number;
		moveY: number;
		range: number | "inf";
		moveStopConditions: MoveStopConditions[];
	};
};

type MovementRules = Record<string, MovementRule>;

export type { MovementRule, MovementRules };
