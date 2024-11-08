import React from "react";
import { formatReleaseYear } from "../../HelperFunctions/formatReleaseYear";
import { selectRatingStyle } from "../../HelperFunctions/selectRatingStyle";
import { LinkComponent } from "../LinkComponent/LinkComponent";
import { PosterComponent } from "../PosterComponent/PosterComponent";
import "./searchItem.css";

export function SearchItem({ movie }) {
	const { name, alternativeName, poster, rating, type } = movie;
	const movieRating = rating?.kp?.toFixed(1);
	const movieRatingStyle = selectRatingStyle(movieRating);
	const movieYear = formatReleaseYear(movie);

	return (
		<div className='searchItem-wrapper'>
			<PosterComponent
				poster={poster}
				imgClassName={"searchItem-img"}
				movieName={name || alternativeName}
			/>
			<div className='searchItem-about'>
				<h4 className='searchItem-name'>{name || alternativeName}</h4>
				<p className='searchItem-info'>
					{movieRating > 0 && (
						<span
							style={movieRatingStyle}
							className='searchItem-rating'
						>
							{movieRating}
						</span>
					)}
					<span className='searchItem-details'>{movieYear ? `${type}, ${movieYear}` : type}</span>
				</p>
			</div>
			<LinkComponent url={`/about/${movie.id}`} />
		</div>
	);
}
