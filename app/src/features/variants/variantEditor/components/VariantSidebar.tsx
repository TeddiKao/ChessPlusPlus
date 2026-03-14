import BoardSettingsButton from "@/features/variants/variantEditor/components/BoardSettingsButton";
import PiecesButton from "@/features/variants/variantEditor/components/PiecesButton";

function VariantSidebar() {
	return (
		<div className="absolute top-0 right-0 flex flex-col gap-4 p-4 h-screen bg-sidebar-primary-foreground">
			<BoardSettingsButton />
			<PiecesButton />
		</div>
	);
}

export default VariantSidebar;
