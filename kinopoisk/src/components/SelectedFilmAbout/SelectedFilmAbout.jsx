import React from "react";
import { formatReleaseYear } from "../../HelperFunctions/formatReleaseYear";
import { FilmBadges } from "../FilmBadges/FilmBadges";
import "./selectedFilmAbout.css";

export function SelectedFilmAbout({ movieLoading, movieError, movieData, seasonsData, filmRating, filmRatingStyle }) {
	const { name, alternativeName, top10, top250, genres, countries, ageRating, shortDescription } = movieData || {};

	const filmYear = formatReleaseYear(movieData);

	return (
		<>
			{movieLoading && <div>Загрузка...</div>}
			{movieError && <div>Ошибка: {movieError}</div>}

			<div className='selectedFilmAbout-mainPage'>
				<h2 className='selectedFilmAbout-title'>{name || alternativeName}</h2>
				<div className='selectedFilmAbout-tags'>
					{top10 || top250 ? (
						<FilmBadges
							rating={filmRating}
							top10={top10}
							top250={top250}
						/>
					) : (
						<>{filmRating > 0 && <span style={filmRatingStyle}>{filmRating}</span>}</>
					)}
					{filmYear && <span>{filmYear}</span>}
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
				<div>{shortDescription && <p className="selectedFilmAbout-description">{shortDescription}</p>}</div>
			</div>
		</>
	);
}
