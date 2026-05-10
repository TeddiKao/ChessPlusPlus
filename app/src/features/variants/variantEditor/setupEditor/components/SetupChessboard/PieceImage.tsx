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

	return <img ref={ref} src={imageUrl ?? undefined} alt={piece} />;
}

export default PieceImage;
