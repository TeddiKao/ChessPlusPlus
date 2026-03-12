import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useVariantDeleteAlertStore from "@/features/variants/variantListing/stores/variantDeleteAlert";

function DeleteVariantAlert() {
	const { isOpen, openAlert, closeAlert } = useVariantDeleteAlertStore();

	return (
		<AlertDialog
			open={isOpen}
			onOpenChange={(open) => (open ? openAlert() : closeAlert())}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete variant?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete this variant? This
						action cannot be undone?
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogAction
						className="px-4"
						type="button"
						variant="destructive"
					>
						Delete variant
					</AlertDialogAction>
					<AlertDialogCancel
						className="px-4"
						type="button"
						variant="outline"
					>
						Cancel
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteVariantAlert;
