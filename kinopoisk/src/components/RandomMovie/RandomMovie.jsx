import { InputNumber } from "antd";
import React, { useState } from "react";
import { countriesNames } from "../../data/countriesNames";
import { genresNames } from "../../data/genresNames";
import { productionCompanies } from "../../data/productionCompanies";
import { randomMovieTypes } from "../../data/randomMovieTypes";
import { MovieListItem } from "../MovieListItem/MovieListItem";
import { RandomMovieSelect } from "../RandomMovieSelect/RandomMovieSelect";
import { RandomMovieSlider } from "../RandomMovieSlider/RandomMovieSlider";

export function RandomMovie() {
	const { loading: movieLoading, error: movieError, data: movieData, handleFetch: loadMovie } = useFetch();
	const defaultYearValue = [1960, new Date().getFullYear()];
	const [MovieFilters, setMovieFilters] = useState({
		year: defaultYearValue,
		country: [],
		genre: [],
		type: [],
		production: [],
		kpRating: [],
	});
	console.log(movieData);

	function handleMovieFetch() {
		loadMovie("randomMovie", 1, MovieFilters);
	}

	function handleCountryChange(selectedCountry) {
		setMovieFilters((prevState) => ({ ...prevState, country: selectedCountry }));
	}

	function handleGenreChange(selectedGenre) {
		setMovieFilters((prevState) => ({ ...prevState, genre: selectedGenre }));
	}

	function handleYearChange(selectedYearRange) {
		setMovieFilters((prevState) => ({ ...prevState, year: selectedYearRange }));
	}

	function handleTypeChange(selectedTypes) {
		setMovieFilters((prevState) => ({ ...prevState, type: selectedTypes }));
	}

	function handleProductionChange(selectedProductions) {
		setMovieFilters((prevState) => ({ ...prevState, production: selectedProductions }));
	}
	function handleRatingChange(rating) {
		setMovieFilters((prevState) => ({ ...prevState, kpRating: rating }));
	}

	return (
		<div>
			<RandomMovieSelect
				optionsPlaceholder='Выберете страну'
				optionsData={countriesNames}
				onChange={handleCountryChange}
			/>
			<RandomMovieSelect
				optionsPlaceholder='Выберете жанр'
				optionsData={genresNames}
				onChange={handleGenreChange}
			/>
			<RandomMovieSelect
				optionsPlaceholder='Выберете тип'
				optionsData={randomMovieTypes}
				onChange={handleTypeChange}
			/>
			<RandomMovieSelect
				optionsPlaceholder='Выберете сеть производства'
				optionsData={productionCompanies}
				onChange={handleProductionChange}
			/>
			<InputNumber
				placeholder='Рейтинг Кинопоиск'
				min={0}
				max={10}
				onChange={handleRatingChange}
			/>
			<RandomMovieSlider
				onChange={handleYearChange}
				defaultYearValue={defaultYearValue}
			/>
			<button onClick={handleMovieFetch}>Поиск</button>
			{movieData && <MovieListItem movie={movieData} />}
		</div>
	);
}
