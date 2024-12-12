import React from "react";
import { countVotes } from "~helperFunctions/CountVotes";
import { formatReleaseYear } from "~helperFunctions/formatReleaseYear";
import { LinkComponent } from "../LinkComponent";
import { MovieBadges } from "../MovieBadges";
import { PosterComponent } from "../PosterComponent";
import "./randomMovieInfo.css";

export function RandomMovieInfo({ movie }) {
	const { name, alternativeName, poster, rating, top10, top250, genres, votes, description, type, countries } = movie;
	const movieRating = rating?.kp?.toFixed(1);
	const movieGenres = genres?.slice(0, 2).map((genre) => genre.name);
	const movieVotes = countVotes(votes);
	const movieReleaseYears = formatReleaseYear(movie) || "";

	return (
		<div className='randomMovie-movieInfoWrapper fade-block'>
			<PosterComponent poster={poster} imgClassName='randomMovie-poster' movieName={name || alternativeName} />
			<div className='randomMovie-movieInfo'>
				<h2 className='randomMovie-movieTitle'>{name || alternativeName}</h2>
				{countries?.name && <span>{countries.name}</span>}
				{movieReleaseYears && (
					<span className='randomMovie-yearAndType'>
						{type && type === "movie" ? "Фильм" : "Сериал"} {movieReleaseYears}
					</span>
				)}
				{movieGenres && (
					<span>
						{genres
							.slice(0, 2)
							.map((genre) => genre.name)
							.join(", ")}
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
