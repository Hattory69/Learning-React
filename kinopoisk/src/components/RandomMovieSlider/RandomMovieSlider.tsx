import { Slider } from "antd";
import React, { useCallback } from "react";
import { createSliderMarks } from "~helperFunctions/createSliderMarks";
import "./randomMovieSlider.css";

interface IRandomMovieSlider {
	onChange: (value: number[]) => void,
	defaultYearValue: number[]
}


export function RandomMovieSlider({ onChange, defaultYearValue }: IRandomMovieSlider) {
	const startYear = defaultYearValue[0];
	const currentYear = defaultYearValue[1];

	const marks = useCallback(() => createSliderMarks(startYear, currentYear), [startYear, currentYear]);

	return (
		<Slider
			range
			className='randomMovie-slider'
			marks={marks()}
			min={startYear}
			max={currentYear}
			defaultValue={[startYear, currentYear]}
			onChange={onChange}
		/>
	);
}
