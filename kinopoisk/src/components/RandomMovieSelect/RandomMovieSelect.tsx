import { Select } from "antd";
import React from "react";
import { IOption } from "~types/types";

interface IRandomMovieSelect {
	onChange: (value: string, option?: IOption | IOption[] | undefined) => void,
	optionsPlaceholder: string,
	optionsData: IOption[],

}

export function RandomMovieSelect({ onChange, optionsPlaceholder, optionsData }: IRandomMovieSelect) {
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
