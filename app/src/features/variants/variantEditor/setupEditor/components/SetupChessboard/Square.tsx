type SquareProps = {
	file: number;
	rank: number;
	imageComponent: React.ReactNode;
};

function Square({ file, rank, imageComponent }: SquareProps) {
	const isDark = (rank + file) % 2 === 0;

	return (
		<div
			key={`${file}-${rank}`}
			className={`${isDark ? "bg-chessboard-square-dark" : "bg-chessboard-square-light"} aspect-square relative`}
		>
			{imageComponent}
		</div>
	);
}

export default Square;
