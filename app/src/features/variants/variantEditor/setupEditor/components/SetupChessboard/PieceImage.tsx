import { useDraggable } from "@dnd-kit/react";

type PieceImageProps = {
	imageUrl: string;
	piece: string;
	file: number;
	rank: number;
};

function PieceImage({ piece, imageUrl, file, rank }: PieceImageProps) {
	const { ref } = useDraggable({
		id: `${file}_${rank}-${piece}`,
	});

	return <img ref={ref} src={imageUrl} alt={piece} />;
}

export default PieceImage;
