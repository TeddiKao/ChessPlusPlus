import { useDraggable } from "@dnd-kit/react";

type PieceImageProps = {
	imageUrl: string | null;
	piece: string;
	file: number;
	rank: number;
};

function PieceImage({ piece, imageUrl, file, rank }: PieceImageProps) {
	const { ref } = useDraggable({
		id: `${file}_${rank}-${piece}`,
		data: {
			startLocation: [file, rank],
		}
	});

	if (!imageUrl) return null;

	return <img ref={ref} src={imageUrl} alt={piece} />;
}

export default PieceImage;
