import {
	Field,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function AppliesToFieldSet() {
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
