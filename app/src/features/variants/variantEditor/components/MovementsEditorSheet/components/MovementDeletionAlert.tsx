import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertDialog } from "@/components/ui/alert-dialog";

function MovementDeletionAlert() {
    return (
        <AlertDialog open={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete movement?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this movement? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                
                <AlertDialogFooter>
                    <AlertDialogCancel className="px-4">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="px-4">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default MovementDeletionAlert;