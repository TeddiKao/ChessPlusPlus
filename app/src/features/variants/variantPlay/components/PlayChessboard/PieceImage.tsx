

type PieceImageProps = {
	imageUrl: string | null;
	piece: string;
	file: number;
	rank: number;
};

function PieceImage({ imageUrl, piece, file, rank }: PieceImageProps) {
	if (!imageUrl) return null;

	return <img src={imageUrl} alt={piece} />;
}

export default PieceImage;