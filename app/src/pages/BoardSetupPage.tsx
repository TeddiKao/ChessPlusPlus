import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import SetupChessboard from "@/features/variants/variantEditor/setupEditor/components/SetupChessboard/SetupChessboard";
import SetupMenu from "@/features/variants/variantEditor/setupEditor/components/SetupMenu";
import SetupToolbar from "@/features/variants/variantEditor/setupEditor/components/SetupToolbar";
import { DragDropProvider } from "@dnd-kit/react";

type OnDragEnd = React.ComponentProps<typeof DragDropProvider>["onDragEnd"];

function BoardSetupPage() {
	const { setupRulesDraft, updateSetupRulesDraft } = useVariantDraftStore();
	if (!setupRulesDraft) return null;

	function handleDragEnd(...args: Parameters<NonNullable<OnDragEnd>>) {
		if (!setupRulesDraft) return;

		const [event] = args;

		if (event.operation.canceled) return;

		const targetSquareId = event.operation.target?.id;
		const [file, rank] = (targetSquareId as string)?.split("-") ?? [];

		if (!file) return;
		if (!rank) return;

		const [player, piece] =
			(event.operation.source?.id as string).split("-") ?? [];

		if (!player) return;
		if (!piece) return;

		const updatedSetupRulesDraft = structuredClone(setupRulesDraft);
		updatedSetupRulesDraft.startingPosition = [
			...updatedSetupRulesDraft.startingPosition,
			[[Number(file), Number(rank)], piece],
		];

		updateSetupRulesDraft({
			...setupRulesDraft,
			startingPosition: updatedSetupRulesDraft.startingPosition,
		});
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
