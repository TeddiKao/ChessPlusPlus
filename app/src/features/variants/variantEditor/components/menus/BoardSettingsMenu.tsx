import { PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function BoardSettingsMenu() {
	return (
		<PopoverContent align="start" sideOffset={24} side="left">
			<h2 className="text-xl">Board settings</h2>
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-4">
					<p>Board setup</p>
					<Button>Edit setup</Button>
				</div>

				<div className="flex flex-row gap-4">
					<p>Board width</p>
					<Input type="number" defaultValue={8} />
				</div>

				<div className="flex flex-row gap-4">
					<p>Board height</p>
					<Input type="number" defaultValue={8} />
				</div>
			</div>
		</PopoverContent>
	);
}

export default BoardSettingsMenu;
