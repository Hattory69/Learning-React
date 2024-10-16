import { InputNumber } from "antd";
import React, { useState } from "react";
import { countriesNames } from "../../data/countriesNames";
import { genresNames } from "../../data/genresNames";
import { productionCompanies } from "../../data/productionCompanies";
import { randomMovieTypes } from "../../data/randomMovieTypes";
import { useFetch } from "../../HelperFunctions/useFetch";
import { MovieListItem } from "../MovieListItem/MovieListItem";
import { RandomFilmSelect } from "../RandomFilmSelect/RandomFilmSelect";
import { RandomFilmSlider } from "../RandomFilmSlider/RandomFilmSlider";

export function RandomFilm() {
	const { loading: movieLoading, error: movieError, data: movieData, handleFetch: loadMovie } = useFetch();
	const defaultYearValue = [1960, new Date().getFullYear()];
	const [filmFilters, setFilmFilters] = useState({
		year: defaultYearValue,
		country: [],
		genre: [],
		type: [],
		production: [],
		kpRating: [],
	});
	console.log(movieData);

	function handleMovieFetch() {
		loadMovie("randomMovie", 1, filmFilters);
	}

	function handleCountryChange(selectedCountry) {
		setFilmFilters((prevState) => ({ ...prevState, country: selectedCountry }));
	}

	function handleGenreChange(selectedGenre) {
		setFilmFilters((prevState) => ({ ...prevState, genre: selectedGenre }));
	}

	function handleYearChange(selectedYearRange) {
		setFilmFilters((prevState) => ({ ...prevState, year: selectedYearRange }));
	}

	function handleTypeChange(selectedTypes) {
		setFilmFilters((prevState) => ({ ...prevState, type: selectedTypes }));
	}

	function handleProductionChange(selectedProductions) {
		setFilmFilters((prevState) => ({ ...prevState, production: selectedProductions }));
	}
	function handleRatingChange(rating) {
		setFilmFilters((prevState) => ({ ...prevState, kpRating: rating }));
	}

	return (
		<div>
			<RandomFilmSelect
				optionsPlaceholder='Выберете страну'
				optionsData={countriesNames}
				onChange={handleCountryChange}
			/>
			<RandomFilmSelect
				optionsPlaceholder='Выберете жанр'
				optionsData={genresNames}
				onChange={handleGenreChange}
			/>
			<RandomFilmSelect
				optionsPlaceholder='Выберете тип'
				optionsData={randomMovieTypes}
				onChange={handleTypeChange}
			/>
			<RandomFilmSelect
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
			<RandomFilmSlider
				onChange={handleYearChange}
				defaultYearValue={defaultYearValue}
			/>
			<button onClick={handleMovieFetch}>Поиск</button>
			{movieData && <MovieListItem movie={movieData} />}
		</div>
	);
}
