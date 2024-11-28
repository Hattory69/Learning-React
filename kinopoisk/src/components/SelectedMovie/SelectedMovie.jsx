import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { selectRatingStyle } from "~helperFunctions/selectRatingStyle";
import {
	useFetchMovieImagesQuery,
	useFetchMovieQuery,
	useFetchMovieReviewsQuery,
	useFetchMovieSeasonsQuery,
	useFetchSimilarMoviesQuery,
} from "~redux/kinopoiskApi";
import { SelectedMovieAbout } from "../SelectedMovieAbout";
import { SelectedMovieDetails } from "../SelectedMovieDetails";
import { SelectedMovieNav } from "../SelectedMovieNav";
import { SelectedMovieSequelsAndSimilar } from "../SelectedMovieSequelsAndSimilar";
import { SelectedMovieSeries } from "../SelectedMovieSeries";
import "./selectedMovie.css";

export function SelectedMovie() {
	const { id } = useParams();
	const [activeTab, setActiveTab] = useState("about");
	const [genres, setGenres] = useState([]);

	const { loading: movieLoading, error: movieError, data: movieData } = useFetchMovieQuery({ id: id });
	const { loading: postersLoading, error: postersError, data: { docs: postersData } = {} } = useFetchMovieImagesQuery({ id: id });
	const { loading: seasonsLoading, error: seasonsError, data: { docs: seasonsData } = [] } = useFetchMovieSeasonsQuery({ id: id });
	const { loading: reviewsLoading, error: reviewsError, data: { docs: reviewsData } = {} } = useFetchMovieReviewsQuery({ id: id });
	const {
		loading: similarMovieLoading,
		error: similarMovieError,
		data: { docs: similarMovieData } = {},
	} = useFetchSimilarMoviesQuery({ genres: genres });

	const movieRating = movieData?.rating?.kp?.toFixed(1);
	const movieRatingStyle = selectRatingStyle(movieRating);

	useEffect(() => {
		setActiveTab("about");
		document.title = `Новый фильм: ${movieData?.name || movieData?.alternativeName}`;
	}, [id, movieData]);

	useEffect(() => {
		if (movieData?.genres) {
			const newGenres = movieData.genres.slice(0, 2).map((genre) => genre.name);
			setGenres(newGenres);
		}
	}, [movieData?.genres]);

	const tabComponents = {
		about: (
			<SelectedMovieAbout
				movieData={movieData || []}
				seasonsData={seasonsData || []}
				movieError={movieError}
				movieLoading={movieLoading}
				movieRatingStyle={movieRatingStyle}
				movieRating={movieRating}
				isActive={activeTab === "about"}
			/>
		),
		series: (
			<SelectedMovieSeries
				idForBtns={id}
				seasonsData={seasonsData || []}
				seasonsError={seasonsError}
				seasonsLoading={seasonsLoading}
				isActive={activeTab === "series"}
			/>
		),
		details: (
			<SelectedMovieDetails
				movieData={movieData || []}
				movieError={movieError}
				movieLoading={movieLoading}
				idForBtns={id}
				movieRatingStyle={movieRatingStyle}
				movieRating={movieRating}
				reviewsData={reviewsData}
				reviewsError={reviewsError}
				reviewsLoading={reviewsLoading}
				postersData={postersData}
				postersError={postersError}
				postersLoading={postersLoading}
				isActive={activeTab === "details"}
			/>
		),
		similar: (
			<SelectedMovieSequelsAndSimilar
				movieData={movieData || []}
				movieError={movieError}
				movieLoading={movieLoading}
				idForBtns={id}
				similarMovieData={similarMovieData || []}
				similarMovieError={similarMovieError}
				similarMovieLoading={similarMovieLoading}
				isActive={activeTab === "similar"}
			/>
		),
	};

	return (
		<div className='selectedMovie-wrapper'>
			<SelectedMovieNav movieData={movieData} seasonsData={seasonsData} setActiveTab={setActiveTab} activeTab={activeTab} />
			{tabComponents[activeTab] || tabComponents.about}
			<div className='selectedMovie-backdropWrapper'>
				<div
					className={`selectedMovie-backdrop ${activeTab !== "about" ? "blur" : ""}`}
					style={{
						backgroundImage: `url(${movieData?.backdrop?.url})`,
					}}
				></div>
			</div>
		</div>
	);
}
