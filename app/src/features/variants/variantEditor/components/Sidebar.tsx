import ChessboardGridIcon from "@/features/variants/icons/ChessboardGridIcon";
import { ChessKnightIcon } from "lucide-react";
import { IconArrowsMove } from "@tabler/icons-react";

function Sidebar() {
	return (
		<div className="flex flex-col gap-4 items-center absolute right-0 top-0 h-screen bg-sidebar-primary-foreground p-5">
			<ChessboardGridIcon className="size-5" />
			<ChessKnightIcon className="size-6" />
			<IconArrowsMove className="size-6" />
		</div>
	);
}

export default Sidebar;
