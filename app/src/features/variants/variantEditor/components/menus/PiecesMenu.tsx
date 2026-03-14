import { PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { IconSearch } from "@tabler/icons-react";

function PiecesMenu() {
	return (
		<PopoverContent side="left" sideOffset={8}>
			<InputGroup className="border-none shadow-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
				<Input
					className="border-none shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
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
