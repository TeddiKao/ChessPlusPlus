import useVariantDraftStore from "@/features/variants/variantEditor/stores/variantDraft";
import type {
	PieceRules,
	PieceRuleset,
} from "@/features/variants/common/types/pieceRules";
import type { SetupRules } from "@/features/variants/common/types/setupRules";

function handlePieceNameUpdate(
	originalPieceName: string,
	pieceRulesetDraft: PieceRuleset,
	setupRulesDraft: SetupRules,
	whitePieceInfo: PieceRules,
	blackPieceInfo: PieceRules,
	newName: string,
) {
	delete pieceRulesetDraft[`white_${originalPieceName}`];
	delete pieceRulesetDraft[`black_${originalPieceName}`];

	pieceRulesetDraft[`white_${newName}`] = whitePieceInfo;
	pieceRulesetDraft[`black_${newName}`] = blackPieceInfo;

	const pieceOwnership = setupRulesDraft.pieceOwnership;
	const startingPosition = setupRulesDraft.startingPosition;

	setupRulesDraft.pieceOwnership.white = pieceOwnership.white.map(
		(pieceName) =>
			pieceName === `white_${originalPieceName}`
				? `white_${newName}`
				: pieceName,
	);

	setupRulesDraft.pieceOwnership.black = pieceOwnership.black.map(
		(pieceName) =>
			pieceName === `black_${originalPieceName}`
				? `black_${newName}`
				: pieceName,
	);

	setupRulesDraft.startingPosition = startingPosition.map((squareInfo) => {
		if (squareInfo.pieceName === `white_${originalPieceName}`) {
			return {
				...squareInfo,
				pieceName: `white_${newName}`,
			};
		} else if (squareInfo.pieceName === `black_${originalPieceName}`) {
			return {
				...squareInfo,
				pieceName: `black_${newName}`,
			};
		} else {
			return squareInfo;
		}
	});

	const updateSetupRulesDraft =
		useVariantDraftStore.getState().updateSetupRulesDraft;
	const updatePieceRulesetDraft =
		useVariantDraftStore.getState().updatePieceRulesetDraft;

	updateSetupRulesDraft(setupRulesDraft);
	updatePieceRulesetDraft(pieceRulesetDraft);
}

export { handlePieceNameUpdate };
