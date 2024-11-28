import React from "react";
import { DefaultCarousel } from "../DefaultCarousel";
import { MovieListItem } from "../MovieListItem";
import "./selectedMovieSequelsAndSimilar.css";

export function SelectedMovieSequelsAndSimilar({ movieData, movieError, movieLoading, idForBtns, similarMovieData, isActive }) {
	const updatedSimilarMovieData = [...(movieData?.sequelsAndPrequels || [])].concat(...(similarMovieData || []));

	return (
		<div className={`selectedMovie-similarWrapper ${isActive && "fade-block"}`}>
			<DefaultCarousel
				loading={movieLoading}
				error={movieError}
				dataToShow={updatedSimilarMovieData}
				showAllSlides={true}
				renderSlide={(movie) => <MovieListItem movie={movie} />}
				idForBtns={idForBtns}
				slideKey={"id"}
			/>
		</div>
	);
}
