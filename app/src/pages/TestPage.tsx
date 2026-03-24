import { sendTestRequest } from "@/test_api/test";

function TestPage() {
	async function handleButtonClick() {
		await sendTestRequest();
	}

	return <button onClick={handleButtonClick}>Click</button>;
}

export default TestPage;
