import React from "react";
import { LinkComponent } from "~components/LinkComponent";
import { MovieBadges } from "~components/MovieBadges";
import { PosterComponent } from "~components/PosterComponent";
import { IMovie } from "~types/types";
import "./movieListItem.css";



export function MovieListItem({ movie }: { movie: IMovie }) {
	const { name, alternativeName, poster, rating, top10, top250, year, genres } = movie;

	const movieRating: number = rating
		? Number(Object.values(rating)
			.filter((value): value is number => value !== null)
			.reduce((max, value) => Math.max(max, value), 0)
			.toFixed(1))
		: 0.0;

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
