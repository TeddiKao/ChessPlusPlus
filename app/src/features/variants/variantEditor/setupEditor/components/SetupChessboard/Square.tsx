import { useDroppable } from "@dnd-kit/react";

type SquareProps = {
	file: number;
	rank: number;
	imageComponent: React.ReactNode;
};

function Square({ file, rank, imageComponent }: SquareProps) {
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
			{imageComponent}
		</div>
	);
}

export default Square;
