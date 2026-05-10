import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import SetupChessboard from "@/features/variants/variantEditor/setupEditor/components/SetupChessboard/SetupChessboard";
import SetupMenu from "@/features/variants/variantEditor/setupEditor/components/SetupMenu";
import SetupToolbar from "@/features/variants/variantEditor/setupEditor/components/SetupToolbar";
import { DragDropProvider } from "@dnd-kit/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

type OnDragEnd = React.ComponentProps<typeof DragDropProvider>["onDragEnd"];

function BoardSetupPage() {
	const { setupRulesDraft, updateSetupRulesDraft, currentVariantId, updateCurrentVariantId } = useVariantDraftStore();
	const { variantId } = useParams();

	useEffect(() => {
		if (currentVariantId) return;
		if (!variantId) return;

		updateCurrentVariantId(variantId);
 	}, []);

	if (!setupRulesDraft) return null;

	function handleDragEnd(...args: Parameters<NonNullable<OnDragEnd>>) {
		if (!setupRulesDraft) return;

		const [event] = args;

		if (event.operation.canceled) return;

		const targetSquareId = event.operation.target?.id;
		const [file, rank] = (targetSquareId as string)?.split("-") ?? [];

		if (!file) return;
		if (!rank) return;

		const [identifier, piece] =
			(event.operation.source?.id as string).split("-") ?? [];

		if (!identifier) return;
		if (!piece) return;

		const updatedSetupRulesDraft = structuredClone(setupRulesDraft);

		const startLocation = event.operation.source?.data.startLocation;

		if (startLocation) {
			updatedSetupRulesDraft.startingPosition =
				updatedSetupRulesDraft.startingPosition.filter(
					([[file, rank]]) =>
						file !== Number(startLocation[0]) || rank !== Number(startLocation[1]),
				);
		}

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
