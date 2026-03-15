import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
	IconChess,
	IconChessBishop,
	IconChevronDown,
} from "@tabler/icons-react";
import { ChessKnightIcon } from "lucide-react";

function PiecesMenu() {
	return (
		<Sheet open={true}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Pieces</SheetTitle>
					<SheetDescription>
						Click on a piece to edit it, or add a new piece
					</SheetDescription>
				</SheetHeader>

				<Collapsible>
					<CollapsibleTrigger asChild>
						<Button
							variant="ghost"
							className="flex flex-row justify-between w-full"
						>
							<span>Default (8)</span>
							<IconChevronDown />
						</Button>
					</CollapsibleTrigger>

					<CollapsibleContent>
						<div className="flex flex-row gap-2">
							<Button variant="ghost">
								<IconChess />
								<span>Pawn</span>
							</Button>
						</div>

						<div className="flex flex-row gap-2">
							<Button variant="ghost">
								<ChessKnightIcon />
								<span>Knight</span>
							</Button>
						</div>

						<div className="flex flex-row gap-2">
							<Button variant="ghost">
								<IconChessBishop />
								<span>Bishop</span>
							</Button>
						</div>
					</CollapsibleContent>
				</Collapsible>
			</SheetContent>
		</Sheet>
	);
}

export default PiecesMenu;
