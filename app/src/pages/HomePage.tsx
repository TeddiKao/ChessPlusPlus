import { Button } from "@/components/ui/button";
import { IconChess, IconPlus } from "@tabler/icons-react";

function HomePage() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-2 bg-linear-to-b from-white to-purple-400">
			<h1 className="text-6xl font-bold">Chess++</h1>
			<p>Create and play with your own custom chess pieces</p>

			<div className="flex flex-row gap-4">
				<Button className="px-4">
					<IconPlus />
					Create variant
				</Button>
				<Button className="px-4">
					<IconChess />
					Play variant
				</Button>
			</div>
		</div>
	);
}

export default HomePage;
