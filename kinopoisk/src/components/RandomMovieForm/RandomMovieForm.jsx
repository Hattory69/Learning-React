import { Button, ConfigProvider, InputNumber } from "antd";
import React, { useState } from "react";
import { countriesNames } from "../../data/countriesNames";
import { genresNames } from "../../data/genresNames";
import { productionCompanies } from "../../data/productionCompanies";
import { randomMovieTypes } from "../../data/randomMovieTypes";
import { RandomMovieSelect } from "../RandomMovieSelect/RandomMovieSelect";
import { RandomMovieSlider } from "../RandomMovieSlider/RandomMovieSlider";
import "./randomMovieForm.css";

export function RandomMovieForm({ handleMovieFetch }) {
	const defaultYearValue = [1960, new Date().getFullYear()];

	const [movieFilters, setMovieFilters] = useState({
		year: defaultYearValue,
		country: [],
		genre: [],
		type: [],
		production: [],
		kpRating: null,
	});

	function handleInputChange(name, value) {
		setMovieFilters((prevState) => ({ ...prevState, [name]: value }));
	}

	return (
		<form
			className='randomMovie-form'
			onSubmit={(e) => {
				e.preventDefault();
				handleMovieFetch(movieFilters);
			}}
		>
			<ConfigProvider
				theme={{
					token: {
						colorText: "white",
						colorBgBase: "#131317",
						colorIcon: "gray",
						colorTextPlaceholder: "white",
					},
				}}
			>
				<div className='randomMovie-inputsWrapper'>
					<RandomMovieSelect
						optionsPlaceholder='Выберете страну'
						optionsData={countriesNames}
						onChange={(value) => handleInputChange("country", value)}
					/>
					<RandomMovieSelect
						optionsPlaceholder='Выберете жанр'
						optionsData={genresNames}
						onChange={(value) => handleInputChange("genre", value)}
					/>
					<RandomMovieSelect
						optionsPlaceholder='Выберете тип'
						optionsData={randomMovieTypes}
						onChange={(value) => handleInputChange("type", value)}
					/>
					<RandomMovieSelect
						optionsPlaceholder='Выберете сеть производства'
						optionsData={productionCompanies}
						onChange={(value) => handleInputChange("production", value)}
					/>
					<InputNumber
						placeholder='Рейтинг Кинопоиск'
						min={0}
						max={10}
						className='randomMovie-formInput randomMovie-kpRating'
						onChange={(value) => handleInputChange("kpRating", value)}
					/>
				</div>
				<RandomMovieSlider
					onChange={(value) => handleInputChange("year", value)}
					defaultYearValue={defaultYearValue}
				/>
				<Button
					size='large'
					className='randomMovie-submitBtn'
					htmlType='submit'
				>
					Поиск
				</Button>
			</ConfigProvider>
		</form>
	);
}
