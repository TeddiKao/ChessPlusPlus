import {
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { IconChevronLeft, IconUpload } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
	Field,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import usePieceSettingsStore from "@/features/variants/variantEditor/pieces/common/stores/pieceSettingsSheet";
import usePieceEditorStore from "@/features/variants/variantEditor/pieces/pieceEditor/stores/pieceEditor";
import { getMovementsListForPiece } from "@/features/variants/variantEditor/pieces/pieceEditor/utils/movementsList";
import usePieceRulesDraftStore from "@/features/variants/variantEditor/common/stores/variantDraft/pieceRulesDraft";
import usePieceMovementEditorStore from "@/features/variants/variantEditor/pieces/pieceEditor/stores/pieceMovementEditor";
import _ from "lodash";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

function MovementTypeFieldSet() {
	return (
		<FieldSet className="gap-2">
			<FieldLegend variant="label">Movement types</FieldLegend>
			<Field orientation="horizontal">
				<Checkbox
					className="border-gray-600"
					id="for-movement-checkbox"
				/>
				<FieldLabel
					className="font-normal"
					htmlFor="for-movement-checkbox"
				>
					For movement
				</FieldLabel>
			</Field>
			<Field orientation="horizontal">
				<Checkbox
					className="border-gray-600"
					id="for-capture-checkbox"
				/>
				<FieldLabel
					className="font-normal"
					htmlFor="for-capture-checkbox"
				>
					For capture
				</FieldLabel>
			</Field>
		</FieldSet>
	);
}

function RangeFieldSet() {
	return (
		<FieldSet className="gap-2">
			<FieldLegend className="mb-1" variant="label">
				Range settings
			</FieldLegend>
			<Field className="grid grid-cols-2 gap-2" orientation="horizontal">
				<FieldLabel className="font-normal" htmlFor="pieceRange">
					Range
				</FieldLabel>
				<Input
					id="pieceRange"
					className="bg-background"
					type="number"
					placeholder="Range"
				/>
			</Field>

			<Field orientation="horizontal">
				<Checkbox className="border-gray-600" id="infiniteRange" />
				<FieldLabel className="font-normal" htmlFor="infiniteRange">
					Infinite range
				</FieldLabel>
			</Field>
		</FieldSet>
	);
}

function OffsetField() {
	return (
		<Field className="grid grid-cols-2 gap-2">
			<FieldLabel className="text-foreground mb-0 font-normal">
				Offsets
			</FieldLabel>

			<div className="grid grid-cols-2 gap-2 items-center">
				<Input
					className="bg-background"
					type="number"
					placeholder="X"
				/>
				<Input
					className="bg-background"
					type="number"
					placeholder="Y"
				/>
			</div>
		</Field>
	);
}

function MoveDefinitionFieldSet() {
	return (
		<FieldSet>
			<FieldLegend className="mb-1" variant="label">
				Move definitions
			</FieldLegend>

			<OffsetField />
			<RangeFieldSet />
		</FieldSet>
	);
}

function AppliesToFieldSet() {
	return (
		<FieldSet>
			<FieldLegend className="mb-1" variant="label">
				Applies to
			</FieldLegend>
			<Field className="grid grid-cols-2 gap-2" orientation="horizontal">
				<FieldLabel className="font-normal">Side</FieldLabel>
				<Select defaultValue="both">
					<SelectTrigger className="w-full bg-background">
						<SelectValue placeholder="Select side" />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value="white">White</SelectItem>
						<SelectItem value="black">Black</SelectItem>
						<SelectItem value="both">Both</SelectItem>
					</SelectContent>
				</Select>
			</Field>
		</FieldSet>
	);
}

function AppearanceTab() {
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

function MovementsTab() {
	const { currentPiece } = usePieceEditorStore();
	const { pieces } = usePieceRulesDraftStore();
	const { activeMovementName, updateActiveMovementName } =
		usePieceMovementEditorStore();

	if (!currentPiece) return null;
	if (!pieces) return null;

	if (!pieces[`white_${currentPiece}`]) return null;
	if (!pieces[`black_${currentPiece}`]) return null;

	const whitePieceMovements = getMovementsListForPiece(
		pieces[`white_${currentPiece}`],
	);
	const blackPieceMovements = getMovementsListForPiece(
		pieces[`black_${currentPiece}`],
	);

	const movementsList = _.isEqual(whitePieceMovements, blackPieceMovements)
		? whitePieceMovements
		: [...whitePieceMovements, ...blackPieceMovements];

	return (
		<TabsContent value="movements" className="flex flex-col gap-4">
			<Accordion
				value={activeMovementName ?? undefined}
				onValueChange={(value) =>
					updateActiveMovementName(value ?? null)
				}
				collapsible
				type="single"
			>
				{movementsList.map(({ moveName, path }) => {
					const key = `${moveName}_${path.join("-")}`;

					return (
						<AccordionItem
							className="border-none no-underline hover:no-underline"
							value={moveName}
							key={key}
						>
							<AccordionTrigger className="flex flex-row justify-between w-full pt-0 pb-3">
								<span>{moveName}</span>
							</AccordionTrigger>

							<AccordionContent className="flex flex-col gap-4">
								<AppliesToFieldSet />
								<MovementTypeFieldSet />
								<MoveDefinitionFieldSet />
							</AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>
		</TabsContent>
	);
}

function PieceEditorScreen() {
	const { updateCurrentSheetMode } = usePieceSettingsStore();
	const { currentPiece, clearCurrentPiece } = usePieceEditorStore();

	function handleBackClick() {
		clearCurrentPiece();
		updateCurrentSheetMode("pieceSelection");
	}

	return (
		<>
			<SheetHeader>
				<SheetTitle className="flex flex-row items-center gap-2">
					<Button onClick={handleBackClick} variant="ghost">
						<IconChevronLeft className="size-5" />
					</Button>
					<span>Piece Editor</span>
				</SheetTitle>
				<SheetDescription>
					You are currently editing the {currentPiece}. Click the back
					arrow to switch your selection.
				</SheetDescription>
			</SheetHeader>

			<Tabs defaultValue="appearance" className="overflow-y-auto">
				<TabsList variant="line">
					<TabsTrigger value="appearance">Appearance</TabsTrigger>
					<TabsTrigger value="movements">Movements</TabsTrigger>
				</TabsList>

				<AppearanceTab />
				<MovementsTab />
			</Tabs>
		</>
	);
}

export default PieceEditorScreen;
