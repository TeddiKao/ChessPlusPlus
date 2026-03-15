import {
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { IconChevronLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

function PieceEditorScreen() {
	return (
		<>
			<SheetHeader>
				<SheetTitle className="flex flex-row items-center gap-2">
					<Button variant="ghost">
						<IconChevronLeft className="size-5" />
					</Button>
					<span>Piece Editor</span>
				</SheetTitle>
				<SheetDescription>
					You are currently editing the bishop. Click the back arrow
					to switch your selection.
				</SheetDescription>
			</SheetHeader>
		</>
	);
}

export default PieceEditorScreen;
