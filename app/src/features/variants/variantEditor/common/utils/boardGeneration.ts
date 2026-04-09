function generateAlphabetSequence(sequenceLength: number) {
	return Array.from({ length: sequenceLength }, (_, index) =>
		String.fromCharCode(65 + index),
	).map((letter) => letter.toLowerCase());
}

function generateNumberSequence(sequenceLength: number) {
	return Array.from({ length: sequenceLength }, (_, index) => index);
}

export { generateAlphabetSequence, generateNumberSequence };
