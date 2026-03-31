import usePiecesEditorStore from "@/features/variants/variantEditor/piecesEditor/stores/piecesEditor";
import { useRef, type ChangeEvent } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconUpload } from "@tabler/icons-react";
import { TabsContent } from "@/components/ui/tabs";

export function AppearanceTab() {
	const { pieceName, updatePieceName } = usePiecesEditorStore();
	const fileUploadInputRef = useRef<HTMLInputElement>(null);

	if (!pieceName) return null;

	function handlePieceNameInputChange(e: ChangeEvent<HTMLInputElement>) {
		updatePieceName(e.target.value);
	}

	function handleUploadImageButtonClick() {
		if (!fileUploadInputRef.current) return;

		fileUploadInputRef.current.click();
	}

	return (
		<TabsContent className="flex flex-col gap-4" value="appearance">
			<Field className="grid grid-cols-2 gap-4">
				<FieldLabel htmlFor="pieceNameInput">Piece name</FieldLabel>
				<Input
					id="pieceNameInput"
					type="text"
					placeholder="Piece name"
					className="bg-background"
					value={pieceName}
					onChange={handlePieceNameInputChange}
				/>
			</Field>

			<div className="grid grid-cols-2 gap-4">
				<p>Piece image</p>
				<Button data-icon="inline-start" variant="outline" onClick={handleUploadImageButtonClick}>
					<IconUpload className="size-5" />
					<span>Upload image</span>
				</Button>

				<Input accept="image/*" type="file" ref={fileUploadInputRef} className="hidden" />
			</div>
		</TabsContent>
	);
}
