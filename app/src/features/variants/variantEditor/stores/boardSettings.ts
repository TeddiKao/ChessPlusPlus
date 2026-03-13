import type { SquareInfo } from "@/features/variants/common/types/setupRules";

type BoardSettingsStore = {
	boardSetup: SquareInfo[];
	addPieceToBoardSetup: (x: number, y: number) => void;
	updateBoardSetup: (newBoardSetup: SquareInfo[]) => void;
	removePieceFromBoardSetup: (x: number, y: number) => void;

	boardXSize: number;
	updateBoardXSize: (newBoardXSize: number) => void;

	boardYSize: number;
	updateBoardYSize: (newBoardYSize: number) => void;
};
