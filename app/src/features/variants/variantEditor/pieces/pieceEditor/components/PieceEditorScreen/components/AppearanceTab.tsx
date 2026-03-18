import { TabsContent } from "@/components/ui/tabs";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconUpload } from "@tabler/icons-react";
import useAppearanceEditorStore from "@/features/variants/variantEditor/pieces/pieceEditor/stores/appearanceEditor";
import { type ChangeEvent, useEffect } from "react";
import usePieceEditorStore from "@/features/variants/variantEditor/pieces/pieceEditor/stores/pieceEditor";

function AppearanceTab() {
	const { currentPiece } = usePieceEditorStore();
	const {
		pieceName,
		updatePieceName,
		clearPieceName,
		clearWhitePieceImage,
		clearBlackPieceImage,
	} = useAppearanceEditorStore();

	useEffect(() => {
		if (!currentPiece) {
			clearPieceName();
			clearWhitePieceImage();
			clearBlackPieceImage();
			return;
		}

		updatePieceName(currentPiece);
	}, [
		currentPiece,
		updatePieceName,
		clearPieceName,
		clearWhitePieceImage,
		clearBlackPieceImage,
	]);

	if (!pieceName) return null;

	function handlePieceNameInputChange(e: ChangeEvent<HTMLInputElement>) {
		updatePieceName(e.target.value);
	}

	return (
		<TabsContent value="appearance" className="flex flex-col gap-4 w-full">
			<Field className="grid grid-cols-2 gap-4 items-center">
				<FieldLabel className="font-normal" htmlFor="pieceName">
					Piece name
				</FieldLabel>
				<Input
					id="pieceName"
					className="bg-white"
					placeholder="Piece name"
					value={pieceName}
					onChange={handlePieceNameInputChange}
				/>
			</Field>

			<div className="grid grid-cols-2 gap-4 items-center">
				<p>Piece image (white)</p>
				<Button className="flex flex-row gap-2" variant="outline">
					<IconUpload />
					<span>Upload image</span>
				</Button>
			</div>

			<div className="grid grid-cols-2 gap-4 items-center">
				<p>Piece image (black)</p>
				<Button className="flex flex-row gap-2" variant="outline">
					<IconUpload />
					<span>Upload image</span>
				</Button>
			</div>
		</TabsContent>
	);
}

export default AppearanceTab;
