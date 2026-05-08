import { Button } from "@/components/ui/button";
import { IconRepeat, IconTrash } from "@tabler/icons-react";

function SetupToolbar() {
	return (
		<div className="flex flex-col justify-center gap-2 bg-gray-100 rounded-md py-2">
			<Button variant="ghost">
				<IconTrash className="size-5" />
			</Button>

			<Button variant="ghost">
				<IconRepeat className="size-5" />
			</Button>
		</div>
	)
}

export default SetupToolbar;