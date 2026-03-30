import useVariantDraftStore from "@/features/variants/variantEditor/stores/variantDraft";
import {
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function PieceSelectionScreen() {
	const { pieceRulesetDraft } = useVariantDraftStore();
	if (!pieceRulesetDraft) return null;

	return (
		<>
			<SheetHeader>
				<SheetTitle>Pieces Editor</SheetTitle>
				<SheetDescription>
					Edit the pieces in this variant.
				</SheetDescription>
			</SheetHeader>

			<div className="flex flex-col px-3">
				{Object.keys(pieceRulesetDraft).map((piece) => (
					<Button
						className="p-0 px-1 justify-start hover:bg-(--sidebar-primary-hover)"
						variant="ghost"
						key={piece}
					>
						{piece}
					</Button>
				))}
			</div>

			<SheetFooter>
				<Button>Create piece</Button>
				<Button variant="outline">Close</Button>
			</SheetFooter>
		</>
	);
}