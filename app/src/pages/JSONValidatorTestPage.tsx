import { Button } from "@/components/ui/button";
import { IconFileUpload } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { type ChangeEvent, useRef, useState } from "react";
import { validateJSON } from "@/features/test/services/jsonValidatorTest";

function JSONValidatorTestPage() {
	const [json, setJSON] = useState<Record<string, unknown> | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	function handleUploadFileButtonClick() {
		if (!fileInputRef.current) return;

		fileInputRef.current.click();
	}

	async function handleJSONValidateButtonClick() {
		if (!json) return;

		const validationResponse = await validateJSON(json);

		console.log(validationResponse);
	}

	async function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return;

		const file = e.target.files[0];
		if (!file) return;

		try {
			const fileText = await file.text();
			const parsedJSON = JSON.parse(fileText);

			if (typeof parsedJSON !== "object") return;
			if (parsedJSON === null) return;
			if (Array.isArray(parsedJSON)) return;

			setJSON(parsedJSON);
		} catch (error) {
			console.error("Failed to parse JSON file", error);
		}
	}

	return (
		<div className="flex flex-col items-center justify-center gap-2 w-full h-full">
			<h1 className="text-2xl font-semibold">JSON Validator Test</h1>
			<p>Upload a JSON file here</p>

			<Button
				onClick={handleUploadFileButtonClick}
				variant="outline"
				type="button"
				data-icon="inline-start"
			>
				<IconFileUpload />
				<span>Upload file</span>
			</Button>

			<Button onClick={handleJSONValidateButtonClick} className="px-4">
				Validate JSON
			</Button>

			<Input
				ref={fileInputRef}
				type="file"
				className="hidden"
				onChange={handleFileUpload}
				accept=".json"
			/>
		</div>
	);
}

export default JSONValidatorTestPage;
