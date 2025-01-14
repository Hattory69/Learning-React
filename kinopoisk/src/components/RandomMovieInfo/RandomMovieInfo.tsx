import React from "react";
import { LinkComponent } from "~components/LinkComponent";
import { MovieBadges } from "~components/MovieBadges";
import { PosterComponent } from "~components/PosterComponent";
import { countVotes } from "~helperFunctions/countVotes";
import { formatReleaseYear } from "~helperFunctions/formatReleaseYear";
import { IMovie } from "~types/types";
import "./randomMovieInfo.css";

export function RandomMovieInfo({ movie }: { movie: IMovie }) {
	const { name, alternativeName, poster, rating, top10, top250, genres, votes, description, type, countries, year, releaseYears } = movie;
	const movieRating = Number(rating?.kp?.toFixed(1));
	const movieGenres = genres?.slice(0, 2).map((genre) => genre.name).join(", ");
	const movieVotes = countVotes(votes);
	const movieReleaseYears = formatReleaseYear(type, releaseYears, year) || "";
	console.log(movieGenres);


	return (
		<div className='randomMovie-movieInfoWrapper fade-block'>
			<PosterComponent poster={poster} imgClassName='randomMovie-poster' movieName={name || alternativeName} />
			<div className='randomMovie-movieInfo'>
				<h2 className='randomMovie-movieTitle'>{name || alternativeName}</h2>
				{countries?.[0]?.name && <span>{countries[0].name}</span>}
				{movieReleaseYears && (
					<span className='randomMovie-yearAndType'>
						{type && type === "movie" ? "Фильм" : "Сериал"} {movieReleaseYears}
					</span>
				)}
				{movieGenres && (
					<span>
						{movieGenres}
					</span>
				)}
				{movieVotes > 0 && <span>Голосов: {movieVotes}</span>}
				<MovieBadges rating={movieRating} top10={top10} top250={top250} showPlace={true} />
				<LinkComponent url={`/about/${movie.id}`} />
				{description && <p className='randomMovie-description'>{description}</p>}
			</div>
		</div>
	);
}
