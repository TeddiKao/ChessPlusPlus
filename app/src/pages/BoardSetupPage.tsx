import SetupChessboard from "@/features/variants/variantEditor/setupEditor/components/SetupChessboard/SetupChessboard";
import SetupMenu from "@/features/variants/variantEditor/setupEditor/components/SetupMenu";
import SetupToolbar from "@/features/variants/variantEditor/setupEditor/components/SetupToolbar";
import { DragDropProvider } from "@dnd-kit/react";

function BoardSetupPage() {
	return (
		<div className="flex flex-row items-center justify-center w-full h-full">
			<DragDropProvider>
				<div className="flex flex-row w-full h-full items-center justify-center gap-4">
					<SetupChessboard />
					<SetupToolbar />
					<SetupMenu />
				</div>
			</DragDropProvider>
		</div>
	);
}

export default BoardSetupPage;
