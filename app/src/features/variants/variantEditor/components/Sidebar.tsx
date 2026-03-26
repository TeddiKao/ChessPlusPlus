import ChessboardGridIcon from "@/features/variants/icons/ChessboardGridIcon";
import { ChessKnightIcon } from "lucide-react";
import { IconArrowsMove } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

function Sidebar() {
	return (
		<div className="flex flex-col gap-4 items-center absolute right-0 top-0 h-screen bg-sidebar-primary-foreground p-3">
			<Button variant="ghost" className="p-1`">
				<ChessboardGridIcon className="size-5" />
			</Button>
			<Button variant="ghost" className="p-1">
				<ChessKnightIcon className="size-6" />
			</Button>
			<Button variant="ghost" className="p-1">
				<IconArrowsMove className="size-6" />
			</Button>
		</div>
	);
}

export default Sidebar;
