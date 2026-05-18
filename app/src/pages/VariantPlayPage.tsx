import { Button } from "@/components/ui/button";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function VariantPlayPage() {
	const navigate = useNavigate();

	function handleBackToHomePage() {
		navigate("/");
	}

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex flex-row items-center gap-2 w-full p-3 pb-0">
				<Button variant="ghost" className="pl-1 pr-2" data-icon="inline-start" onClick={handleBackToHomePage}>
					<IconChevronLeft className="size-5" />
					<span className="text-base font-normal">Back</span>
				</Button>
			</div>
		</div>
	);
}

export default VariantPlayPage;