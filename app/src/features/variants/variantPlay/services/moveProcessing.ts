import api from "@/app/api";
import { AxiosError } from "axios";

type GenerateLegalMovesResponse = {
	legalMoves: [number, number][] | null;
};

async function generateLegalMoves(
	gameId: string,
	currentPos: [number, number],
): Promise<GenerateLegalMovesResponse> {
	try {
		const response = await api.post("game/generate-legal-moves/", {
			gameId,
			currentPos,
		});

		return response.data.legalMoves;
	}
	catch (error) {
		if (error instanceof AxiosError) {
			console.log(error.response);
		}

		return { legalMoves: null };
	}
}

export { generateLegalMoves };