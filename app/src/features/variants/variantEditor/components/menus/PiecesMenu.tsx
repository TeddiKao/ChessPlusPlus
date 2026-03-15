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
import { IconChevronDown } from "@tabler/icons-react";
import {
	ChessBishopIcon,
	ChessKingIcon,
	ChessKnightIcon,
	ChessPawnIcon,
	ChessQueenIcon,
	ChessRookIcon,
} from "lucide-react";

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
								<ChessPawnIcon className="size-5" />
								<span>Pawn</span>
							</Button>
						</div>

						<div className="flex flex-row gap-2">
							<Button variant="ghost">
								<ChessKnightIcon className="size-5" />
								<span>Knight</span>
							</Button>
						</div>

						<div className="flex flex-row gap-2">
							<Button variant="ghost">
								<ChessBishopIcon className="size-5" />
								<span>Bishop</span>
							</Button>
						</div>

						<div className="flex flex-row gap-2">
							<Button variant="ghost">
								<ChessRookIcon className="size-5" />
								<span>Rook</span>
							</Button>
						</div>

						<div className="flex flex-row gap-2">
							<Button variant="ghost">
								<ChessQueenIcon className="size-5" />
								<span>Queen</span>
							</Button>
						</div>

						<div className="flex flex-row gap-2">
							<Button variant="ghost">
								<ChessKingIcon className="size-5" />
								<span>King</span>
							</Button>
						</div>
					</CollapsibleContent>
				</Collapsible>
			</SheetContent>
		</Sheet>
	);
}

export default PiecesMenu;
