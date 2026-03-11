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

function DeleteVariantAlert() {
	return (
		<AlertDialog open={true}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete variant?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete this variant? This
						action cannot be undone?
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogAction type="button" variant="destructive">
						Delete variant
					</AlertDialogAction>
					<AlertDialogCancel type="button" variant="outline">
						Cancel
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteVariantAlert;
