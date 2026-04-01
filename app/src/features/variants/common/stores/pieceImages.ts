import type { PieceImage } from "@/features/variants/common/types/pieceImages";
import { generateId } from "@/shared/utils/idGeneration";
import { create } from "zustand";

type PieceImagesStore = {
	images: Record<string, PieceImage>;
	addImage: (imageBlob: Blob) => void;
	removeImage: (imageId: string) => void;
};

const usePieceImagesStore = create<PieceImagesStore>((set) => ({
	images: {},
	addImage: (imageBlob) => {
		const generatedImageId = generateId();

		set((state) => ({
			images: {
				...state.images,
				[generatedImageId]: { image: imageBlob }
			},
		}));
	},

	removeImage: (imageId: string) => {
		set((state) => {
			const updatedImages = structuredClone(state.images);
			delete updatedImages[imageId];
			return { images: updatedImages };
		});
	},
}));

export default usePieceImagesStore;