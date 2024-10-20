import { Slider } from "antd";
import React from "react";

export function RandomFilmSlider({ onChange, defaultYearValue }) {
	const startYear = defaultYearValue[0];
	const currentYear = defaultYearValue[1];

	const marks = {};

	for (let index = startYear; index <= currentYear; index += 10) {
		marks[index] = index;
	}

	if (currentYear % 10 !== 0) {
		marks[currentYear] = currentYear;
	}

	return (
		<Slider
			range
			marks={marks}
			min={startYear}
			max={currentYear}
			defaultValue={[startYear, currentYear]}
			onChange={onChange}
		/>
	);
}
