import api from "@/app/api";

async function sendTestRequest() {
	const response = await api.post("/test");

	console.log(response);

	return response;
}

export { sendTestRequest };
