import {Button} from "@/components/ui/button";

function HomePage() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-2">
			<h1 className="text-4xl font-bold">Chess++</h1>
			<p>Create and play with your own custom chess pieces</p>

			<div className="flex flex-row gap-4">
				<Button className="px-4">Create variant</Button>
				<Button className="px-4">Play variant</Button>
			</div>
		</div>
	)
}

export default HomePage;