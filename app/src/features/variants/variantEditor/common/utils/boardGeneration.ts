function generateAlphabetSequence(sequenceLength: number) {
	return Array.from({ length: sequenceLength }, (_, index) =>
		String.fromCharCode(65 + index),
	).map((letter) => letter.toLowerCase());
}

export { generateAlphabetSequence };
