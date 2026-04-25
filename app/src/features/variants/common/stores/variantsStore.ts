import type { VariantInfo } from "@/features/variants/common/types/variants";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateId } from "@/shared/utils/idGeneration";
import { createIndexedDBStorage } from "zustand-indexeddb";
import VariantListDialog from "../../variantListing/components/VariantListDialog";
import { TupleKeyedMap } from "@itwin/core-bentley";
import { reviveTupleKeyedMap } from "../utils/tupleKeyMapRevive";
import { hasInternalMap } from "@/shared/utils/typeChecks";

type VariantsStore = {
	variants: Record<string, VariantInfo>;

	createVariant: (variantInfo: VariantInfo) => void;
	removeVariant: (variantId: string) => void;
	updateVariant: (variantId: string, newVariantInfo: VariantInfo) => void;

	hasHydrated: boolean;
	markAsHydrated: () => void;
	resetHydrationState: () => void;
};

const useVariantsStore = create<VariantsStore>()(
	persist(
		(set) => ({
			variants: {},

			createVariant: (variantInfo) => {
				const generatedVariantId = generateId();

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

			hasHydrated: false,
			markAsHydrated: () => set({ hasHydrated: true }),
			resetHydrationState: () => set({ hasHydrated: false }),
		}),
		{
			name: "variants",
			storage: createIndexedDBStorage(
				"chessPlusPlusVariantsDB",
				"variants",
			),
			partialize: (state) => ({ variants: state.variants }),
			onRehydrateStorage: () => (state, error) => {
				if (error) {
					console.error("Error rehydrating variants:", error);
				}

				const updatedVariants = structuredClone(state?.variants) ?? {};
				const tupleKeyedMapRevivedVariants = Object.fromEntries(
					Object.entries(updatedVariants).map(
						([variantId, variantInfo]) => {
							const updatedVariantInfo =
								structuredClone(variantInfo);
							const originalStartingPosition =
								updatedVariantInfo.variantRules.setupRules
									.startingPosition;
							const revivedStartingPositionMap =
								reviveTupleKeyedMap<[number, number], string>(originalStartingPosition);

							updatedVariantInfo.variantRules.setupRules.startingPosition = revivedStartingPositionMap;

							return [variantId, variantInfo];
						},
					),
				);

				if (state) {
					state.variants = tupleKeyedMapRevivedVariants
				}

				state?.markAsHydrated();
			},
		},
	),
);

export default useVariantsStore;
