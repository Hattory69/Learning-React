import React from "react";
import { DefaultCarousel } from "../DefaultCarousel/DefaultCarousel";
import { MovieListItem } from "../MovieListItem/MovieListItem";

export function SelectedFilmSequelsAndSimilar({ movieData, movieError, movieLoading, idForBtns, similarMovieData }) {
	const updatedSimilarMovieData = [...(similarMovieData || [])];
	updatedSimilarMovieData.unshift(...(movieData?.sequelsAndPrequels || []));

	return (
		<div>
			<p>test</p>
			<DefaultCarousel
				loading={movieLoading}
				error={movieError}
				slidesPerView={Math.min(updatedSimilarMovieData.length, 5)}
				dataToShow={updatedSimilarMovieData}
				showAllSlides={true}
				renderSlide={(movie) => <MovieListItem movie={movie} />}
				idForBtns={idForBtns}
				slideKey={"id"}
			/>
		</div>
	);
}
