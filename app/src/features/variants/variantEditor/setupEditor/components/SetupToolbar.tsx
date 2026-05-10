import { Button } from "@/components/ui/button";
import useVariantDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft";
import { IconRepeat, IconTrash } from "@tabler/icons-react";

function SetupToolbar() {
	const { setupRulesDraft, updateSetupRulesDraft, syncSetupRulesDraftToDB } = useVariantDraftStore();
	if (!setupRulesDraft) return null;

	function handleClearBoard() {
		if (!setupRulesDraft) return;
		const updatedSetupRulesDraft = structuredClone(setupRulesDraft);

		updatedSetupRulesDraft.startingPosition = [];
		updateSetupRulesDraft(updatedSetupRulesDraft);
		syncSetupRulesDraftToDB();
	}

	return (
		<div className="flex flex-col justify-center gap-2 bg-white shadow-md shadow-gray-400 rounded-md py-2 px-1">
			<Button onClick={handleClearBoard} variant="ghost" className="hover:bg-gray-300 p-1">
				<IconTrash className="size-6" />
			</Button>

			<Button variant="ghost" className="hover:bg-gray-300 p-1">
				<IconRepeat className="size-6" />
			</Button>
		</div>
	);
}

export default SetupToolbar;
