import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectRatingStyle } from "../../HelperFunctions/selectRatingStyle";
import { useFetch } from "../../HelperFunctions/useFetch";
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
	const { loading: movieLoading, error: movieError, data: movieData, handleFetch: loadMovie } = useFetch();
	const { loading: reviewsLoading, error: reviewsError, data: reviewsData, handleFetch: loadReviews } = useFetch();
	const { loading: seasonsLoading, error: seasonsError, data: seasonsData, handleFetch: loadSeasons } = useFetch();
	const { loading: similarMovieLoading, error: similarMovieError, data: similarMovieData, handleFetch: loadSimilarMovie } = useFetch();
	const { loading: postersLoading, error: postersError, data: postersData, handleFetch: loadPosters } = useFetch();
	const footerHeight = useSelector((state) => state.footer.height);
	const headerHeight = useSelector((state) => state.header.height);

	const filmRating = Math.max(...Object.values(movieData?.rating || {})).toFixed(1);
	const filmRatingStyle = selectRatingStyle(filmRating);

	useEffect(() => {
		setActiveTab("about");
		loadMovie("specificItem", 1, id);
		loadPosters("posters", 10, id);
		loadSeasons("seasons", 100, id);
		loadReviews("itemReviews", 10, id);
	}, [id]);

	useEffect(() => {
		setGenres(movieData?.genres.slice(0, 2).map((genre) => genre.name));
		document.title = `Новый фильм: ${movieData?.name || movieData?.alternativeName}`;
	}, [movieData]);

	useEffect(() => {
		if (genres?.length > 0) {
			loadSimilarMovie("similarMovies", 10, genres);
		}
	}, [genres]);

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
					filmRatingStyle={filmRatingStyle}
					filmRating={filmRating}
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
					filmRatingStyle={filmRatingStyle}
					filmRating={filmRating}
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
