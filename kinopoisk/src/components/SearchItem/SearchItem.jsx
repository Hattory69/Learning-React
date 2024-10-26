import React from "react";
import { formatReleaseYear } from "../../HelperFunctions/formatReleaseYear";
import { selectRatingStyle } from "../../HelperFunctions/selectRatingStyle";
import { LinkComponent } from "../LinkComponent/LinkComponent";
import { PosterComponent } from "../PosterComponent/PosterComponent";
import "./searchItem.css";

export function SearchItem({ Movie }) {
	const { name, alternativeName, poster, rating, type } = Movie;
	const MovieRating = rating?.kp?.toFixed(1);
	const MovieRatingStyle = selectRatingStyle(MovieRating);
	const MovieYear = formatReleaseYear(Movie);

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
					{MovieRating > 0 && (
						<span
							style={MovieRatingStyle}
							className='searchItem-rating'
						>
							{MovieRating}
						</span>
					)}
					<span className='searchItem-details'>{MovieYear ? `${type}, ${MovieYear}` : type}</span>
				</p>
			</div>
			<LinkComponent url={`/about/${Movie.id}`} />
		</div>
	);
}
