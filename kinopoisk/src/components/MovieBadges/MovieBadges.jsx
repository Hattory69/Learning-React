import React from "react";
import lightning from "../../images/lightning.svg";
import olive from "../../images/olive-branch.svg";
import { IconComponent } from "../IconComponent/IconComponent";
import "./movieBadges.css";

export function MovieBadges({ rating, top10, top250, showPlace }) {
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
		<div className='movieBadge-wrapper'>
			<div className={`movieBadge-ratingWrapper ${style}`}>
				{(top10 || top250) && (
					<IconComponent
						icon={olive}
						iconStyle={"movieBadge-oliveBranch"}
					/>
				)}
				<span className={`movieBadge-rating`}>{rating}</span>
				{(top10 || top250) && (
					<IconComponent
						icon={olive}
						iconStyle={"movieBadge-oliveBranch rotateIcon"}
					/>
				)}
			</div>
			{(top10 || top250) && (
				<div className='movieBadge-topWrapper'>
					<IconComponent
						icon={lightning}
						iconStyle={"movieBadge-lightning"}
					/>
					<span className='movieBadge-top'>{`Top-${top10 ? "10" : "250"}`}</span>
				</div>
			)}
			{showPlace && <span className='movieBadge-placeInTop'>{top10 || top250}</span>}
		</div>
	);
}
