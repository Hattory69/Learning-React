import { Image } from "antd";
import React, { useState } from "react";
import blancImg from "../../images/movieImgNotFound.svg";
import { FilmBadges } from "../FilmBadges/FilmBadges";
import { IconComponent } from "../IconComponent/IconComponent";
import { LinkComponent } from "../LinkComponent/LinkComponent";
import "./movieListItem.css";

export function MovieListItem({ movie }) {
	const [isImgError, setIsImgError] = useState(false);
	const { name, alternativeName, poster, rating, top10, top250, year, genres } = movie;

	const filmRating = Math.max(...Object.values(rating || [])).toFixed(1);

	return (
		<li className='movieListItem-wrapper'>
			{isImgError ? (
				<IconComponent
					icon={blancImg}
					iconStyle='movieListItem-img'
				/>
			) : (
				<Image
					className='movieListItem-img'
					src={poster?.url || "noImg"}
					placeholder={false}
					alt={`Постер к ${name || alternativeName}`}
					onError={() => setIsImgError(true)}
				/>
			)}
			{filmRating > 0.0 && (
				<div className='movieListItem-badges'>
					<FilmBadges
						rating={filmRating}
						top10={top10}
						top250={top250}
					/>
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