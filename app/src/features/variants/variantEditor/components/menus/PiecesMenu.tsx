import { PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { IconSearch } from "@tabler/icons-react";

function PiecesMenu() {
	return (
		<PopoverContent side="left" sideOffset={8}>
			<InputGroup className="border-none shadow-none">
				<Input
					className="border-none shadow-none"
					type="text"
					placeholder="Search pieces..."
				/>
				<InputGroupAddon align="inline-start">
					<IconSearch />
				</InputGroupAddon>
			</InputGroup>
		</PopoverContent>
	);
}

export default PiecesMenu;
