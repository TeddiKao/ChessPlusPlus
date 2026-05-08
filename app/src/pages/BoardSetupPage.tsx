import SetupChessboard from "@/features/variants/variantEditor/setupEditor/components/SetupChessboard";
import SetupMenu from "@/features/variants/variantEditor/setupEditor/components/SetupMenu";
import SetupToolbar from "@/features/variants/variantEditor/setupEditor/components/SetupToolbar";

function BoardSetupPage() {
	return (
		<div className="flex flex-row items-center justify-center w-full h-full">
			<div className="flex flex-row w-full h-full items-center justify-center gap-4">
				<SetupChessboard />
				<SetupToolbar />
				<SetupMenu />
			</div>
		</div>
	);
}

export default BoardSetupPage;
