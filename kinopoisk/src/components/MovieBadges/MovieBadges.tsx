import React from "react";
import { IconComponent } from "~components/IconComponent";
import lightning from "~images/lightning.svg";
import olive from "~images/olive-branch.svg";
import "./movieBadges.css";

interface IMovieBadges {
	rating: number | null | undefined,
	top10: number | null | undefined,
	top250: number | null | undefined,
	showPlace?: boolean
}

export function MovieBadges({ rating, top10, top250, showPlace }: IMovieBadges) {
	let style = "";
	if (top10 || top250) {
		style = "onTop";
	} else if (rating && rating >= 7) {
		style = "goodRating";
	} else if (rating && rating >= 4) {
		style = "averageRating";
	} else {
		style = "lowRating";
	}

	return (
		<div className='movieBadge-wrapper'>
			{rating && rating > 0 && (
				<div className={`movieBadge-ratingWrapper ${style}`}>
					{(top10 || top250) && <IconComponent icon={olive} iconStyle={"movieBadge-oliveBranch"} />}
					<span className={`movieBadge-rating`}>{rating}</span>
					{(top10 || top250) && <IconComponent icon={olive} iconStyle={"movieBadge-oliveBranch rotateIcon"} />}
				</div>
			)}
			{(top10 || top250) && (
				<div className='movieBadge-topWrapper'>
					<IconComponent icon={lightning} iconStyle={"movieBadge-lightning"} />
					<span className='movieBadge-top'>{`Top-${top10 ? "10" : "250"}`}</span>
				</div>
			)}
			{showPlace && (top10 || top250) && <span className='movieBadge-placeInTop'>{top10 || top250}</span>}
		</div>
	);
}
