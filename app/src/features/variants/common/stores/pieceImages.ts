import type { PieceImage } from "@/features/variants/common/types/pieceImages";
import { generateId } from "@/shared/utils/idGeneration";
import { create } from "zustand";
import { createIndexedDBStorage } from "zustand-indexeddb";
import { persist } from "zustand/middleware";

type PieceImagesStore = {
	images: Record<string, PieceImage>;
	addImage: (imageBlob: Blob) => void;
	removeImage: (imageId: string) => void;

	hasHydrated: boolean;
	markAsHydrated: () => void;
	resetHydrationState: () => void;
};

const usePieceImagesStore = create<PieceImagesStore>()(
	persist(
		(set) => ({
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

			hasHydrated: false,
			markAsHydrated: () => set({ hasHydrated: true }),
			resetHydrationState: () => set({ hasHydrated: false }),
		}),

		{
			name: "pieceImages",
			storage: createIndexedDBStorage("chessPlusPlusDB", "pieceImages"),
			partialize: (state) => ({ images: state.images }),
			onRehydrateStorage: () => (state, error) => {
				if (error) {
					console.error("Error rehydrating piece images:", error);
				}

				state?.markAsHydrated();
			},
		},
	),
);

export default usePieceImagesStore;