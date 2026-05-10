import PieceImage from "@/features/variants/variantEditor/setupEditor/components/SetupChessboard/PieceImage";
import { useDroppable } from "@dnd-kit/react";
import clsx from "clsx";

type SquareProps = {
	file: number;
	rank: number;
	imageUrl: string | null;
	piece: string;
};

function Square({ file, rank, imageUrl, piece }: SquareProps) {
	const { ref } = useDroppable({
		id: `${file}-${rank}`,
	});

	const isDark = (rank + file) % 2 === 0;

	return (
		<div
			ref={ref}
			key={`${file}-${rank}`}
			className={`${isDark ? "bg-chessboard-square-dark" : "bg-chessboard-square-light"} aspect-square relative`}
		>
			<PieceImage
				imageUrl={imageUrl ?? null}
				piece={piece}
				file={file}
				rank={rank}
			/>

			<span
				className={clsx(
					"absolute top-0 left-0 text-xs font-semibold p-1",
					isDark
						? "text-chessboard-square-light"
						: "text-chessboard-square-dark",
				)}
			>
				{rank}
			</span>

			<span
				className={clsx(
					"absolute bottom-0 right-0 text-xs font-semibold p-1",
					isDark
						? "text-chessboard-square-light"
						: "text-chessboard-square-dark",
				)}
			>
				{file}
			</span>
		</div>
	);
}

export default Square;
