export function createSliderMarks(startYear, currentYear) {
	const marks = {};

	for (let index = startYear; index <= currentYear; index += 10) {
		marks[index] = index;
	}

	if (currentYear % 10 !== 0) {
		marks[currentYear] = currentYear;
	}
	return marks;
}
