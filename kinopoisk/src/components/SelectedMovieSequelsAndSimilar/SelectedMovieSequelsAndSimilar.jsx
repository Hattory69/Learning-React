import React, { useState } from "react";
import { calcSlidesPerView } from "../../HelperFunctions/calcSlidesPerView";
import { useSlidesPerView } from "../../HelperFunctions/useSlidesPerView";
import { DefaultCarousel } from "../DefaultCarousel/DefaultCarousel";
import { MovieListItem } from "../MovieListItem/MovieListItem";
import "./selectedMovieSequelsAndSimilar.css";

export function SelectedMovieSequelsAndSimilar({ movieData, movieError, movieLoading, idForBtns, similarMovieData, isActive }) {
	const [slidesPerView, setSlidesPerView] = useState(calcSlidesPerView());

	useSlidesPerView(setSlidesPerView);
	const updatedSimilarMovieData = [...(similarMovieData || [])];
	updatedSimilarMovieData.unshift(...(movieData?.sequelsAndPrequels || []));

	return (
		<div className={`selectedMovie-similarWrapper ${isActive && "fade-block"}`}>
			<DefaultCarousel
				loading={movieLoading}
				error={movieError}
				slidesPerView={slidesPerView}
				dataToShow={updatedSimilarMovieData}
				showAllSlides={true}
				renderSlide={(movie) => <MovieListItem movie={movie} />}
				idForBtns={idForBtns}
				slideKey={"id"}
			/>
		</div>
	);
}
