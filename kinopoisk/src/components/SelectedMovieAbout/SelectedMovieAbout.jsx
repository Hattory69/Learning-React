import React from "react";
import { formatReleaseYear } from "../../HelperFunctions/formatReleaseYear";
import { MovieBadges } from "../MovieBadges/MovieBadges";
import "./selectedMovieAbout.css";

export function SelectedMovieAbout({ movieLoading, movieError, movieData, seasonsData, movieRating, movieRatingStyle, isActive }) {
	const { name, alternativeName, top10, top250, genres, countries, ageRating, shortDescription } = movieData || {};

	const MovieYear = formatReleaseYear(movieData);

	return (
		<>
			{movieLoading && <div>Загрузка...</div>}
			{movieError && <div>Ошибка: {movieError}</div>}

			<div className={`selectedMovieAbout-wrapper ${isActive && "fade-block"}`}>
				<h2 className='selectedMovieAbout-title'>{name || alternativeName}</h2>
				<div className='selectedMovieAbout-tags'>
					{top10 || top250 ? (
						<MovieBadges
							rating={movieRating}
							top10={top10}
							top250={top250}
						/>
					) : (
						<>{movieRating > 0 && <span style={movieRatingStyle}>{movieRating}</span>}</>
					)}
					{MovieYear && <span>{MovieYear}</span>}
					{genres?.length > 0 && (
						<span>
							{genres
								.slice(0, 2)
								.map((genre) => genre.name)
								.join(", ")}
						</span>
					)}
					{seasonsData?.length > 0 && <span>{`сезонов - ${seasonsData?.length}`}</span>}
					{countries?.[0].name && <span>{countries?.[0].name}</span>}
					{ageRating !== null && <span>{`${ageRating}+`}</span>}
				</div>
				<div>{shortDescription && <p className='selectedMovieAbout-description'>{shortDescription}</p>}</div>
			</div>
		</>
	);
}
