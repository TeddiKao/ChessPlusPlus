import SetupChessboard from "@/features/variants/variantEditor/setupEditor/components/SetupChessboard/SetupChessboard";
import SetupMenu from "@/features/variants/variantEditor/setupEditor/components/SetupMenu";
import SetupToolbar from "@/features/variants/variantEditor/setupEditor/components/SetupToolbar";
import {
	DragDropProvider,
} from "@dnd-kit/react";

type OnDragEnd = React.ComponentProps<typeof DragDropProvider>["onDragEnd"];

function BoardSetupPage() {
	function handleDragEnd(...args: Parameters<NonNullable<OnDragEnd>>) {
		const [event] = args;

		if (event.operation.canceled) return;

		console.log(event.operation.target?.id);
	}

	return (
		<div className="flex flex-row items-center justify-center w-full h-full">
			<DragDropProvider onDragEnd={handleDragEnd}>
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
