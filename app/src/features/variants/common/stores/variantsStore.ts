import type { VariantInfo } from "@/features/variants/common/types/variants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { generateVariantId } from "@/features/variants/common/utils/idGeneration";

type VariantsStore = {
	variants: Record<string, VariantInfo>;

	createVariant: (variantInfo: VariantInfo) => void;
	removeVariant: (variantId: string) => void;
	updateVariant: (variantId: string, newVariantInfo: VariantInfo) => void;
};

const useVariantsStore = create<VariantsStore>()(
	persist(
		(set) => ({
			variants: {},

			createVariant: (variantInfo) => {
				const generatedVariantId = generateVariantId();

				set((state) => ({
					variants: {
						...state.variants,
						[generatedVariantId]: variantInfo,
					},
				}));
			},

			removeVariant: (variantId) => {
				set((state) => {
					const updatedVariants = structuredClone(state.variants);
					delete updatedVariants[variantId];

					return { variants: updatedVariants };
				});
			},

			updateVariant: (variantId, newVariantInfo) => {
				set((state) => ({
					variants: {
						...state.variants,
						[variantId]: newVariantInfo,
					},
				}));
			},
		}),
		{
			name: "variants",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useVariantsStore;
