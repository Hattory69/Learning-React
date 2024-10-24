import { ConfigProvider, InputNumber } from "antd";
import React, { useState } from "react";
import { countriesNames } from "../../data/countriesNames";
import { genresNames } from "../../data/genresNames";
import { productionCompanies } from "../../data/productionCompanies";
import { randomMovieTypes } from "../../data/randomMovieTypes";
import { useLazyFetchRandomMovieQuery } from "../../redux/kinopoiskApi";
import { MovieListItem } from "../MovieListItem/MovieListItem";
import { RandomMovieSelect } from "../RandomMovieSelect/RandomMovieSelect";
import { RandomMovieSlider } from "../RandomMovieSlider/RandomMovieSlider";
import "./randomMovie.css";

export function RandomMovie() {
	const defaultYearValue = [1960, new Date().getFullYear()];

	const [fetchMovie, fetchResult] = useLazyFetchRandomMovieQuery();
	const movieData = fetchResult.data;

	const [movieFilters, setMovieFilters] = useState({
		year: defaultYearValue,
		country: [],
		genre: [],
		type: [],
		production: [],
		kpRating: [],
	});

	function handleInputChange(name, value) {
		setMovieFilters((prevState) => ({ ...prevState, [name]: value }));
	}

	function handleMovieFetch() {
		fetchMovie(movieFilters);
	}

	return (
		<div className='randomMovie-wrapper'>
			<form
				className='randomMovie-form'
				onSubmit={(e) => {
					e.preventDefault();
					handleMovieFetch();
				}}
			>
				<ConfigProvider
					theme={{
						token: {
							colorText: "white",
							colorBgBase: "#131317",
							colorBgContainer: "#14213d",
							colorIcon: "gray",
							colorTextPlaceholder: "orange",
						},
					}}
				>
					<RandomMovieSelect
						optionsPlaceholder='Выберете страну'
						optionsData={countriesNames}
						onChange={(value) => handleInputChange("country", value)}
						className='randomMovie-formInput'
					/>
					<RandomMovieSelect
						optionsPlaceholder='Выберете жанр'
						optionsData={genresNames}
						className='randomMovie-formInput'
						onChange={(value) => handleInputChange("genre", value)}
					/>
					<RandomMovieSelect
						optionsPlaceholder='Выберете тип'
						optionsData={randomMovieTypes}
						className='randomMovie-formInput'
						onChange={(value) => handleInputChange("type", value)}
					/>
					<RandomMovieSelect
						optionsPlaceholder='Выберете сеть производства'
						optionsData={productionCompanies}
						className='randomMovie-formInput'
						onChange={(value) => handleInputChange("production", value)}
					/>
					<InputNumber
						placeholder='Рейтинг Кинопоиск'
						min={0}
						max={10}
						className='randomMovie-formInput'
						onChange={(value) => handleInputChange("kpRating", value)}
					/>
					<RandomMovieSlider
						className='randomMovie-formInput'
						onChange={(value) => handleInputChange("year", value)}
						defaultYearValue={defaultYearValue}
					/>
				</ConfigProvider>
				<button type='submit'>Поиск</button>
			</form>
			{movieData && (
				<div className='fade-block'>
					<MovieListItem movie={movieData} />
				</div>
			)}
		</div>
	);
}
