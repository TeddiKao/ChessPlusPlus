import { PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { IconSearch } from "@tabler/icons-react";

function PiecesMenu() {
	return (
		<PopoverContent>
			<InputGroup>
				<Input type="text" placeholder="Search pieces..." />
				<InputGroupAddon align="inline-start">
					<IconSearch />
				</InputGroupAddon>
			</InputGroup>
		</PopoverContent>
	);
}

export default PiecesMenu;
