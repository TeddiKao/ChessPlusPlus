function generateNumberSequence(sequenceLength: number) {
	return Array.from({ length: sequenceLength }, (_, index) => index);
}

export { generateNumberSequence };
