import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SelectedMovieAbout } from "~components/SelectedMovieAbout";
import { SelectedMovieDetails } from "~components/SelectedMovieDetails";
import { SelectedMovieNav } from "~components/SelectedMovieNav";
import { SelectedMovieSequelsAndSimilar } from "~components/SelectedMovieSequelsAndSimilar";
import { SelectedMovieSeries } from "~components/SelectedMovieSeries";
import { selectRatingStyle } from "~helperFunctions/selectRatingStyle";
import {
	useFetchMovieImagesQuery,
	useFetchMovieQuery,
	useFetchMovieReviewsQuery,
	useFetchMovieSeasonsQuery,
	useFetchSimilarMoviesQuery,
} from "~redux/kinopoiskApi";
import { IMovieGenres } from "~types/types";
import "./selectedMovie.css";

export function SelectedMovie() {
	const { id } = useParams();

	const [activeTab, setActiveTab] = useState<"about" | "series" | "details" | "similar">("about");
	const [genres, setGenres] = useState<string[]>([]);

	const { data: movieData } = useFetchMovieQuery({ id: id });
	const { data: { docs: postersData } = {} } = useFetchMovieImagesQuery({ id: id });
	const { data: { docs: seasonsData } = [] } = useFetchMovieSeasonsQuery({ id: id });
	const { data: { docs: reviewsData } = {} } = useFetchMovieReviewsQuery({ id: id });
	const { data: { docs: similarMovieData } = {} } = useFetchSimilarMoviesQuery({ genres: genres });

	const movieRating = movieData?.rating?.kp?.toFixed(1);
	const movieRatingStyle = selectRatingStyle(movieRating);

	useEffect(() => {
		setActiveTab("about");
		document.title = `Новый фильм: ${movieData?.name || movieData?.alternativeName}`;
	}, [id, movieData]);

	useEffect(() => {
		if (movieData?.genres) {
			const newGenres = movieData.genres.slice(0, 2).map((genre: IMovieGenres) => genre.name);
			setGenres(newGenres);
		}
	}, [movieData?.genres]);

	const tabComponents = {
		about: (
			<SelectedMovieAbout
				movieData={movieData || []}
				seasonsData={seasonsData || []}
				movieRatingStyle={movieRatingStyle}
				movieRating={movieRating}
				isActive={activeTab === "about"}
			/>
		),
		series: <SelectedMovieSeries
			idForBtns={id}
			seasonsData={seasonsData || []}
			isActive={activeTab === "series"} />,
		details: (
			<SelectedMovieDetails
				movieData={movieData || []}
				idForBtns={id}
				movieRatingStyle={movieRatingStyle}
				movieRating={movieRating}
				reviewsData={reviewsData}
				postersData={postersData}
				isActive={activeTab === "details"}
			/>
		),
		similar: (
			<SelectedMovieSequelsAndSimilar
				movieData={movieData || []}
				idForBtns={id}
				similarMovieData={similarMovieData || []}
				isActive={activeTab === "similar"}
			/>
		),
	};

	return (
		<div className='selectedMovie-wrapper'>
			<SelectedMovieNav
				movieData={movieData}
				seasonsData={seasonsData}
				setActiveTab={setActiveTab}
				activeTab={activeTab} />
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
