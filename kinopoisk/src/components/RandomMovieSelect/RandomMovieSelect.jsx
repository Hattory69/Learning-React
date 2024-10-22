import { Select } from "antd";
import React from "react";

export function RandomMovieSelect({ onChange, optionsPlaceholder, optionsData }) {
	return (
		<Select
			mode='multiple'
			style={{
				width: "100%",
			}}
			onChange={onChange}
			placeholder={optionsPlaceholder}
			options={optionsData}
			allowClear
		/>
	);
}
