import type {
	MovementRules,
	MoveStopConditions,
} from "@/features/variants/common/types/movementRules";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type MovementRulesDraftStore = {
	movementRules: Record<string, MovementRules> | null;
	updateMovementRules: (newRules: Record<string, MovementRules>) => void;
	clearMovementRules: () => void;

	enableMovement: (moveName: string) => void;
	disableMovement: (moveName: string) => void;

	enableCapture: (moveName: string) => void;
	disableCapture: (moveName: string) => void;

	updateMovementXOffset: (moveName: string, newXOffset: number) => void;
	updateMovementYOffset: (moveName: string, newYOffset: number) => void;

	updateMovementRange: (moveName: string, newRange: number | "inf") => void;

	addMoveStopCondition: (
		moveName: string,
		newStopCondition: MoveStopConditions,
	) => void;
	removeMoveStopCondition: (
		moveName: string,
		stopConditionToRemove: MoveStopConditions,
	) => void;
};

const useMovementRulesDraftStore = create<MovementRulesDraftStore>()(
	immer((set) => ({
		movementRules: null,
		updateMovementRules: (newMovementRules) =>
			set({ movementRules: newMovementRules }),
		clearMovementRules: () => set({ movementRules: null }),

		enableMovement: (moveName) => {
			set((state) => {
				if (!state.movementRules) return;
				if (!state.movementRules[moveName]) return;

				state.movementRules[moveName].forMovement = true;
			});
		},

		disableMovement: (moveName) => {
			set((state) => {
				if (!state.movementRules) return;
				if (!state.movementRules[moveName]) return;

				state.movementRules[moveName].forMovement = false;
			});
		},

		enableCapture: (moveName) => {
			set((state) => {
				if (!state.movementRules) return;
				if (!state.movementRules[moveName]) return;

				state.movementRules[moveName].forCapture = true;
			});
		},

		disableCapture: (moveName) => {
			set((state) => {
				if (!state.movementRules) return;
				if (!state.movementRules[moveName]) return;

				state.movementRules[moveName].forCapture = false;
			});
		},

		updateMovementXOffset: (moveName, newXOffset) => {
			set((state) => {
				if (!state.movementRules) return;
				if (!state.movementRules[moveName]) return;

				state.movementRules[moveName].moveDefinition.moveX = newXOffset;
			});
		},

		updateMovementYOffset: (moveName, newYOffset) => {
			set((state) => {
				if (!state.movementRules) return;
				if (!state.movementRules[moveName]) return;

				state.movementRules[moveName].moveDefinition.moveY = newYOffset;
			});
		},

		updateMovementRange: (moveName, newRange) => {
			set((state) => {
				if (!state.movementRules) return;
				if (!state.movementRules[moveName]) return;

				state.movementRules[moveName].moveDefinition.range = newRange;
			});
		},

		addMoveStopCondition: (moveName, newStopCondition) => {
			set((state) => {
				if (!state.movementRules) return;
				if (!state.movementRules[moveName]) return;

				state.movementRules[
					moveName
				].moveDefinition.moveStopConditions.push(newStopCondition);
			});
		},

		removeMoveStopCondition: (moveName, stopConditionToRemove) => {
			set((state) => {
				if (!state.movementRules) return;
				if (!state.movementRules[moveName]) return;

				state.movementRules[
					moveName
				].moveDefinition.moveStopConditions = state.movementRules[
					moveName
				].moveDefinition.moveStopConditions.filter(
					(condition) => condition !== stopConditionToRemove,
				);
			});
		},
	})),
);

export default useMovementRulesDraftStore;
