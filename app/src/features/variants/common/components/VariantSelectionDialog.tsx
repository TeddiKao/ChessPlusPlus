import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useVariantsStore from "@/features/variants/common/stores/variantsStore";

type VariantAction = {
	label: string;
	variant: "default" | "outline" | "destructive";
	execute: (variantId: string) => void;
};

export type VariantActions = Record<string, VariantAction>;

type VariantSelectionDialogProps = {
	actions: VariantActions;
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	handleVariantSelection: (variantId: string) => void;
	selectedVariantId: string | null;
};

function VariantSelectionDialog({
	actions,
	isOpen,
	onOpenChange,
	handleVariantSelection,
	selectedVariantId,
}: VariantSelectionDialogProps) {
	const { variants } = useVariantsStore();

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>My variants</DialogTitle>
					<DialogDescription>
						Below is a list of your created variants
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-2">
					{Object.entries(variants).map(
						([variantId, variantInfo]) => (
							<button
								type="button"
								onClick={() =>
									handleVariantSelection(variantId)
								}
								className={
									selectedVariantId === variantId
										? "flex flex-row gap-2 p-2 rounded-md border-primary border-2 bg-(--muted-primary) [--tw-shadow-color:var(--shadow-primary)] shadow-md"
										: "flex flex-row gap-2 shadow-md p-2 rounded-md bg-gray-300 shadow-gray-600"
								}
								aria-pressed={selectedVariantId === variantId}
								key={variantId}
							>
								<span>{variantInfo.variantName}</span>
							</button>
						),
					)}
				</div>

				{selectedVariantId && variants[selectedVariantId] && (
					<DialogFooter>
						{Object.entries(actions).map(([variantId, action]) => (
							<Button
								key={variantId}
								onClick={() =>
									action.execute(selectedVariantId)
								}
								variant={action.variant}
								className="px-4"
								type="button"
							>
								{action.label}
							</Button>
						))}
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
}

export default VariantSelectionDialog;
