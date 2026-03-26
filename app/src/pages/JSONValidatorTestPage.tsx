import { Button } from "@/components/ui/button";
import { IconFileUpload } from "@tabler/icons-react";

function JSONValidatorTestPage() {
	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-xl">JSON Validator Test</h1>
			<p>Upload a JSON file here</p>

			<Button variant="outline" type="button" data-icon="inline-start">
				<IconFileUpload />
				<span>Upload file</span>
			</Button>
		</div>
	);
}

export default JSONValidatorTestPage;
