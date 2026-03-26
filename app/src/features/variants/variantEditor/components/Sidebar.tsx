import ChessboardGridIcon from "@/features/variants/icons/ChessboardGridIcon";

function Sidebar() {
	return (
		<div className="flex flex-col gap-4 right-0 top-0 h-screen bg-sidebar-primary-foreground">
			<ChessboardGridIcon />
		</div>
	);
}

export default Sidebar;
