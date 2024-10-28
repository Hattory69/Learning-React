import React, { useState } from "react";
import { useLazyFetchRandomMovieQuery } from "../../redux/kinopoiskApi";
import { RandomMovieForm } from "../RandomMovieForm/RandomMovieForm";
import { RandomMovieInfo } from "../RandomMovieInfo/RandomMovieInfo";
import "./randomMovie.css";

export function RandomMovie() {
	const [fetchMovie, fetchResult] = useLazyFetchRandomMovieQuery();
	const { isFetching } = fetchResult;
	const [movieData, setMovieData] = useState(null);

	function handleMovieFetch(movieFilters) {
		setMovieData(null);
		fetchMovie({ searchData: movieFilters }).then((result) => {
			setMovieData(result.data);
		});
	}

	return (
		<div className='randomMovie-wrapper'>
			<RandomMovieForm handleMovieFetch={handleMovieFetch} />
			{isFetching ? <div className='loader'>Подбираем фильм...</div> : movieData && <RandomMovieInfo movie={movieData} />}
		</div>
	);
}
