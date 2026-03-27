type ChessboardGridIconProps = {
	className?: string;
};

function ChessboardGridIcon({ className = "" }: ChessboardGridIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="#000000"
			id="Checkerboard-Fill--Streamline-Phosphor-Fill"
			height={16}
			width={16}
			className={className}
		>
			<desc>
				{
					"\n    Checkerboard Fill Streamline Icon: https://streamlinehq.com\n  "
				}
			</desc>
			<path
				d="M14.53333125 0.16H1.46666875C0.7450125 0.16 0.16 0.7450125 0.16 1.46666875v13.0666625c0 0.721675 0.58499375 1.3067 1.30666875 1.30666875h13.0666625c0.721675 0.00003125 1.30666875 -0.58499375 1.30666875 -1.30666875V1.46666875c0 -0.72165625 -0.5850125 -1.30666875 -1.30666875 -1.30666875Zm0 14.37333125H8V8H1.46666875V1.46666875H8V8h6.53333125v6.53333125Z"
				strokeWidth={0.0625}
			/>
		</svg>
	);
}

export default ChessboardGridIcon;
