import api from "@/app/api";

async function validateJSON(json: Record<string, unknown>) {
	const response = await api.post("/json-validator-test", {
		jsonToValidate: json,
	});

	return response.data;
}

export { validateJSON };
