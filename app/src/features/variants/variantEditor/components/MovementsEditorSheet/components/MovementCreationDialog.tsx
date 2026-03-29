import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function MovementCreationDialog() {
    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Movement</DialogTitle>
                </DialogHeader>

                <Field>
                    <FieldLabel htmlFor="movementNameInput">Movement Name</FieldLabel>
                    <Input id="movementNameInput" type="text" placeholder="Enter movement name" />
                </Field>
            </DialogContent>
        </Dialog>
    );
}

export default MovementCreationDialog;