import React from "react";
import lightning from "../../images/lightning.svg";
import olive from "../../images/olive-branch.svg";
import { IconComponent } from "../IconComponent/IconComponent";
import "./FilmBadges.css";

export function FilmBadges({ rating, top10, top250, showPlace }) {
	let style = "";
	if (top10 || top250) {
		style = "onTop";
	} else if (rating >= 7) {
		style = "goodRating";
	} else if (rating >= 4) {
		style = "averageRating";
	} else {
		style = "lowRating";
	}

	return (
		<div className='filmBadge-wrapper'>
			<div className={`filmBadge-ratingWrapper ${style}`}>
				{(top10 || top250) && (
					<IconComponent
						icon={olive}
						iconStyle={"filmBadge-oliveBranch"}
					/>
				)}
				<span className={`filmBadge-rating`}>{rating}</span>
				{(top10 || top250) && (
					<IconComponent
						icon={olive}
						iconStyle={"filmBadge-oliveBranch rotateIcon"}
					/>
				)}
			</div>
			{(top10 || top250) && (
				<div className='filmBadge-topWrapper'>
					<IconComponent
						icon={lightning}
						iconStyle={"ilmRatingIcon-oliveBranch"}
					/>
					<span className='filmBadge-top'>{`Top-${top10 ? "10" : "250"}`}</span>
				</div>
			)}
			{showPlace && <span className='filmBadge-placeInTop'>{top10 || top250}</span>}
		</div>
	);
}
