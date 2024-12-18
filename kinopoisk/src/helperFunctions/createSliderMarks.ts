type Mark = Record<number, number>;

export function createSliderMarks(startYear: number, currentYear: number) {
	const marks: Mark = {};

	for (let index = startYear; index <= currentYear; index += 10) {
		marks[index] = index;
	}

	if (currentYear % 10 !== 0) {
		marks[currentYear] = currentYear;
	}
	return marks;
}
