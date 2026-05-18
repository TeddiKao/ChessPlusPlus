import { Button } from "@/components/ui/button";
import PlayChessboard from "@/features/variants/variantPlay/components/PlayChessboard/PlayChessboard";
import usePlayChessboardStore from "@/features/variants/variantPlay/stores/playChessboard";
import { DragDropProvider } from "@dnd-kit/react";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

type OnDragEnd = React.ComponentProps<typeof DragDropProvider>["onDragEnd"];

function VariantPlayPage() {
	const navigate = useNavigate();

	const { gameBoardState, updateGameBoardState } = usePlayChessboardStore();

	function handleBackToHomePage() {
		navigate("/");
	}

	function handleDragEnd(...args: Parameters<NonNullable<OnDragEnd>>) {
		if (!gameBoardState) return;

		const [event] = args;

		if (event.operation.canceled) return;

		const targetSquareId = event.operation.target?.id;
		const [file, rank] = (targetSquareId as string)?.split("-") ?? [];

		if (!file) return;
		if (!rank) return;

		const startLocation = event.operation.source?.data.startLocation;
		const piece = event.operation.source?.data.piece;

		if (!startLocation) return;
		if (!piece) return;

		const updatedGameBoardState = structuredClone(gameBoardState);
		updatedGameBoardState.set([Number(file), Number(rank)], piece);

		updateGameBoardState(updatedGameBoardState);
	}

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex flex-row items-center gap-2 w-full p-3 pb-0">
				<Button
					variant="ghost"
					className="pl-1 pr-2"
					data-icon="inline-start"
					onClick={handleBackToHomePage}
				>
					<IconChevronLeft className="size-5" />
					<span className="text-base font-normal">Back</span>
				</Button>
			</div>

			<div className="flex flex-row items-center justify-center w-full h-full">
				<DragDropProvider onDragEnd={handleDragEnd}>
					<PlayChessboard />
				</DragDropProvider>
			</div>
		</div>
	);
}

export default VariantPlayPage;
