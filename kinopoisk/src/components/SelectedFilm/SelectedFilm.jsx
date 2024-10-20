import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectRatingStyle } from "../../HelperFunctions/selectRatingStyle";

import {
	useFetchMovieImagesQuery,
	useFetchMovieQuery,
	useFetchMovieReviewsQuery,
	useFetchMovieSeasonsQuery,
	useFetchSimilarMoviesQuery,
} from "../../redux/kinopoiskApi";
import { SelectedFilmAbout } from "../SelectedFilmAbout/SelectedFilmAbout";
import { SelectedFilmDetails } from "../SelectedFilmDetails/SelectedFilmDetails";
import { SelectedFilmNav } from "../SelectedFilmNav/SelectedFilmNav";
import { SelectedFilmSequelsAndSimilar } from "../SelectedFilmSequelsAndSimilar/SelectedFilmSequelsAndSimilar";
import { SelectedFilmSeries } from "../SelectedFilmSeries/SelectedFilmSeries";
import "./selectedFilm.css";

export function SelectedFilm() {
	const { id } = useParams();
	const [genres, setGenres] = useState([]);
	const [activeTab, setActiveTab] = useState("about");
	const { loading: movieLoading, error: movieError, data: movieData } = useFetchMovieQuery({ id: id });
	const { loading: postersLoading, error: postersError, data: { docs: postersData } = {} } = useFetchMovieImagesQuery({ id: id });
	const { loading: seasonsLoading, error: seasonsError, data: { docs: seasonsData } = {} } = useFetchMovieSeasonsQuery({ id: id });
	const { loading: reviewsLoading, error: reviewsError, data: { docs: reviewsData } = {} } = useFetchMovieReviewsQuery({ id: id });
	const {
		loading: similarMovieLoading,
		error: similarMovieError,
		data: { docs: similarMovieData } = {},
	} = useFetchSimilarMoviesQuery({ genres: genres });

	const footerHeight = useSelector((state) => state.footer.height);
	const headerHeight = useSelector((state) => state.header.height);

	const movieRating = Math.max(...Object.values(movieData?.rating || {})).toFixed(1);
	const movieRatingStyle = selectRatingStyle(movieRating);

	useEffect(() => {
		setActiveTab("about");
	}, [id]);

	useEffect(() => {
		if (movieData?.genres) {
			document.title = `Новый фильм: ${movieData.name || movieData.alternativeName}`;
			const newGenres = movieData.genres.slice(0, 2).map((genre) => genre.name);
			setGenres(newGenres);
		}
	}, [movieData?.genres]);

	return (
		<div
			className='selectedFilm-wrapper'
			style={{ height: `calc(100vh - (${footerHeight}px + ${headerHeight}px + 15px))` }}
		>
			<SelectedFilmNav
				movieData={movieData}
				seasonsData={seasonsData}
				setActiveTab={setActiveTab}
				activeTab={activeTab}
			/>
			{activeTab === "about" && (
				<SelectedFilmAbout
					movieData={movieData || []}
					seasonsData={seasonsData || []}
					movieError={movieError}
					movieLoading={movieLoading}
					movieRatingStyle={movieRatingStyle}
					movieRating={movieRating}
					isActive={activeTab === "about"}
				/>
			)}
			{activeTab === "series" && (
				<SelectedFilmSeries
					idForBtns={id}
					seasonsData={seasonsData || []}
					seasonsError={seasonsError}
					seasonsLoading={seasonsLoading}
					isActive={activeTab === "series"}
				/>
			)}
			{activeTab === "details" && (
				<SelectedFilmDetails
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
			)}
			{activeTab === "similar" && (
				<SelectedFilmSequelsAndSimilar
					movieData={movieData || []}
					movieError={movieError}
					movieLoading={movieLoading}
					idForBtns={id}
					similarMovieData={similarMovieData || []}
					similarMovieError={similarMovieError}
					similarMovieLoading={similarMovieLoading}
					isActive={activeTab === "similar"}
				/>
			)}
			<div className='selectedFilm-backdropWrapper'>
				<div
					className={`selectedFilm-backdrop ${activeTab !== "about" ? "blur" : ""}`}
					style={{
						backgroundImage: `url(${movieData?.backdrop?.url})`,
					}}
				></div>
			</div>
		</div>
	);
}
