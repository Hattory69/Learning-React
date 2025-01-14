import React from "react";
import { DefaultCarousel } from "~components/DefaultCarousel";
import { MovieListItem } from "~components/MovieListItem";
import { SWIPER_WINDOW_WIDE_BREAKPOINTS } from "~data/constants";
import { IMovie } from "~types/types";
import "./selectedMovieSequelsAndSimilar.css";

interface ISelectedMovieSequelsAndSimilar {
	movieData: IMovie,
	idForBtns: string | undefined,
	similarMovieData: IMovie[],
	isActive: boolean,
}

export function SelectedMovieSequelsAndSimilar({ movieData, idForBtns, similarMovieData, isActive }: ISelectedMovieSequelsAndSimilar) {
	const updatedSimilarMovieData = [...(movieData?.sequelsAndPrequels || [])].concat(...(similarMovieData || []));

	return (
		<div className={`selectedMovie-similarWrapper ${isActive && "fade-block"}`}>
			<DefaultCarousel
				dataToShow={updatedSimilarMovieData}
				renderSlide={(movie) => <MovieListItem movie={movie} />}
				idForBtns={idForBtns}
				slideKey={"id"}
				breakpoints={SWIPER_WINDOW_WIDE_BREAKPOINTS}
			/>
		</div>
	);
}
