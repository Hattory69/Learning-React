import React, { useState } from "react";
import { RandomMovieForm } from "~components/RandomMovieForm";
import { RandomMovieInfo } from "~components/RandomMovieInfo";
import { useLazyFetchRandomMovieQuery } from "~redux/kinopoiskApi";
import "./randomMovie.css";

export interface IMovieFilters {
	year: number[],
	country: string,
	genre: string,
	type: string,
	production: string,
	kpRating: number | null,
}

export function RandomMovie() {
	const [fetchMovie, fetchResult] = useLazyFetchRandomMovieQuery();
	const { isFetching } = fetchResult;
	const [movieData, setMovieData] = useState(null);

	function handleMovieFetch(movieFilters: IMovieFilters) {
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
