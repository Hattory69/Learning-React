import React from "react";
import { LinkComponent } from "../LinkComponent";
import { MovieBadges } from "../MovieBadges";
import { PosterComponent } from "../PosterComponent";
import "./movieListItem.css";

export function MovieListItem({ movie }) {
	const { name, alternativeName, poster, rating, top10, top250, year, genres } = movie;

	const movieRating = rating ? Math.max(...Object.values(rating)).toFixed(1) : "0.0";

	return (
		<li className='movieListItem-wrapper'>
			<PosterComponent poster={poster} imgClassName='movieListItem-img' movieName={name || alternativeName} />
			{movieRating > 0.0 && (
				<div className='movieListItem-badges'>
					<MovieBadges rating={movieRating} top10={top10} top250={top250} />
				</div>
			)}
			<div className='movieListItem-itemInfo'>
				<p className='movieListItem-title'>{name || alternativeName}</p>
				<span className='movieListItem-year'>{year || ""}</span>
				<span className='movieListItem-genres'>{genres?.map((genre) => genre.name).join(", ")}</span>
			</div>
			<LinkComponent url={`/about/${movie.id}`} />
		</li>
	);
}
