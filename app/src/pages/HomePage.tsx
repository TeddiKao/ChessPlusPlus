import {Button} from "@/components/ui/button";

function HomePage() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full">
			<h1 className="text-3xl">Chess++</h1>
			<p>Create and play with your own custom chess pieces</p>

			<div className="flex flex-row">
				<Button>Create variant</Button>
				<Button>Play variant</Button>
			</div>
		</div>
	)
}

export default HomePage;