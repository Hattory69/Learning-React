import React from "react";
import { DefaultCarousel } from "../DefaultCarousel/DefaultCarousel";
import { MovieListItem } from "../MovieListItem/MovieListItem";
import './selectedFilmSequelsAndSimilar.css'

export function SelectedFilmSequelsAndSimilar({ movieData, movieError, movieLoading, idForBtns, similarMovieData, isActive }) {
	const updatedSimilarMovieData = [...(similarMovieData || [])];
	updatedSimilarMovieData.unshift(...(movieData?.sequelsAndPrequels || []));

	return (
		<div className={`selectedFilm-similarWrapper ${isActive && "fade-block"}`}>
			<DefaultCarousel
				loading={movieLoading}
				error={movieError}
				slidesPerView={Math.min(updatedSimilarMovieData.length, 7)}
				dataToShow={updatedSimilarMovieData}
				showAllSlides={true}
				renderSlide={(movie) => <MovieListItem movie={movie} />}
				idForBtns={idForBtns}
				slideKey={"id"}
			/>
		</div>
	);
}
