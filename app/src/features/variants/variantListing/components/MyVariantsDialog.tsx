
import useVariantsStore from "@/features/variants/common/stores/variantsStore";
import useVariantListDialogStore from "@/features/variants/variantListing/stores/variantListDialog";
import DeleteVariantAlert from "@/features/variants/variantListing/components/DeleteVariantAlert";
import useVariantDeleteAlertStore from "@/features/variants/variantListing/stores/variantDeleteAlert";
import VariantRenameDialog from "@/features/variants/variantListing/components/VariantRenameDialog";
import useVariantRenameDialogStore from "@/features/variants/variantListing/stores/variantRenameDialog";
import { useNavigate } from "react-router-dom";
import VariantSelectionDialog, { type VariantActions } from "@/features/variants/common/components/VariantSelectionDialog";

function VariantListDialog() {
	const { hasHydrated } = useVariantsStore();
	const {
		isOpen,
		openDialog: openVariantListDialog,
		closeDialog: closeVariantListDialog,
		selectedVariantId,
		updateSelectedVariantId,
		clearSelectedVariantId,
	} = useVariantListDialogStore();

	const { openAlert } = useVariantDeleteAlertStore();

	const { openDialog: openVariantRenameDialog } =
		useVariantRenameDialogStore();

	const navigate = useNavigate();

	if (!hasHydrated) return null;

	function handleVariantSelection(variantId: string) {
		if (variantId === selectedVariantId) {
			clearSelectedVariantId();
		} else {
			updateSelectedVariantId(variantId);
		}
	}

	const actions: VariantActions = {
		open: {
			label: "Open",
			variant: "default",
			execute: (variantId) => {
				closeVariantListDialog();
				navigate(`variants/${variantId}`);
			}
		},
		rename: {
			label: "Rename",
			variant: "outline",
			execute: (variantId) => {
				openVariantRenameDialog(variantId);
			}
		},
		delete: {
			label: "Delete",
			variant: "destructive",
			execute: (variantId) => {
				openAlert(variantId);
			}
		}
	}

	return (
		<>
			<VariantSelectionDialog
				actions={actions}
				isOpen={isOpen}
				onOpenChange={(isOpen) => isOpen ? openVariantListDialog() : closeVariantListDialog()}
				handleVariantSelection={handleVariantSelection}
				selectedVariantId={selectedVariantId}
			/>

			<DeleteVariantAlert />
			<VariantRenameDialog />
		</>
	);
}

export default VariantListDialog;
