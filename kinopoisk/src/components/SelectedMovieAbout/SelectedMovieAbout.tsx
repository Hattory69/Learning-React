import React from "react";
import { MovieBadges } from "~components/MovieBadges";
import { formatReleaseYear } from "~helperFunctions/formatReleaseYear";
import { IMovie, ISeries } from "~types/types";
import "./selectedMovieAbout.css";

interface ISelectedMovieAbout {
	movieData: IMovie | undefined,
	seasonsData: ISeries[],
	movieRating: number | null,
	movieRatingStyle?: { color: string },
	isActive: boolean,
}

export function SelectedMovieAbout({ movieData, seasonsData, movieRating, movieRatingStyle, isActive }: ISelectedMovieAbout) {
	const { name, alternativeName, top10, top250, genres, countries, ageRating, shortDescription, type, releaseYears, year } = movieData || {};

	const movieYear = formatReleaseYear(type, releaseYears, year);

	return (
		<>
			<div className={`selectedMovieAbout-wrapper ${isActive && "fade-block"}`}>
				<h2 className='selectedMovieAbout-title'>{name || alternativeName}</h2>
				<div className='selectedMovieAbout-tags'>
					{top10 || top250 ? (
						<MovieBadges rating={movieRating} top10={top10} top250={top250} />
					) : (
						<>{Number(movieRating) > 0 && <span style={movieRatingStyle}>{movieRating}</span>}</>
					)}
					{movieYear && <span>{movieYear}</span>}
					{(genres != undefined && genres.length > 0) && (
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
				{shortDescription && <p className='selectedMovieAbout-description'>{shortDescription}</p>}
			</div>
		</>
	);
}
