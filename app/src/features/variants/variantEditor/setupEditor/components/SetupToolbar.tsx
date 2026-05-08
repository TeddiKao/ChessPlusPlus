import { Button } from "@/components/ui/button";
import { IconRepeat, IconTrash } from "@tabler/icons-react";

function SetupToolbar() {
	return (
		<div className="flex flex-col justify-center gap-2 bg-white shadow-md shadow-gray-400 rounded-md py-2 px-1">
			<Button variant="ghost" className="hover:bg-gray-300 p-1">
				<IconTrash className="size-6" />
			</Button>

			<Button variant="ghost" className="hover:bg-gray-300 p-1">
				<IconRepeat className="size-6" />
			</Button>
		</div>
	);
}

export default SetupToolbar;
