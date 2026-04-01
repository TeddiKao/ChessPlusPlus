import { sendTestRequest } from "@/features/test/services/test";

function TestPage() {
	async function handleButtonClick() {
		await sendTestRequest();
	}

	return <button onClick={handleButtonClick}>Click</button>;
}

export default TestPage;
