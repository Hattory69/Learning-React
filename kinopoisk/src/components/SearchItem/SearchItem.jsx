import { Image } from "antd";
import React, { useState } from "react";
import { formatReleaseYear } from "../../HelperFunctions/formatReleaseYear";
import { selectRatingStyle } from "../../HelperFunctions/selectRatingStyle";
import blancImg from "../../images/movieImgNotFound.svg";
import { IconComponent } from "../IconComponent/IconComponent";
import { LinkComponent } from "../LinkComponent/LinkComponent";
import "./searchItem.css";

export function SearchItem({ Movie }) {
	const [isImgError, setIsImgError] = useState(false);

	const { name, alternativeName, poster, rating, type } = Movie;
	const MovieRating = Math.max(...Object.values(rating)).toFixed(1);
	const MovieRatingStyle = selectRatingStyle(MovieRating);
	const MovieYear = formatReleaseYear(Movie);

	return (
		<div className='searchItem-wrapper'>
			{isImgError ? (
				<IconComponent
					icon={blancImg}
					iconStyle='searchItem-img'
				/>
			) : (
				<Image
					className='searchItem-img'
					src={poster?.url || "noImg"}
					placeholder={false}
					alt={`Постер к ${name || alternativeName}`}
					onError={() => setIsImgError(true)}
				/>
			)}

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
