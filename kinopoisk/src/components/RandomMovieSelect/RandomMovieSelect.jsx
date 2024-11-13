import { Select } from "antd";
import React from "react";

export function RandomMovieSelect({ onChange, optionsPlaceholder, optionsData }) {
	return (
		<Select
			className='randomMovie-formInput'
			popupClassName='randomMovie-inputDropdown'
			mode='multiple'
			style={{
				width: "100%",
			}}
			onChange={onChange}
			placeholder={optionsPlaceholder}
			options={optionsData}
			allowClear
			maxCount={3}
		/>
	);
}
