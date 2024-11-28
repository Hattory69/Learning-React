import { Image } from "antd";
import React from "react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import { EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { countVotes } from "~helperFunctions/CountVotes";
import { MovieBadges } from "../MovieBadges";
import { SelectedMovieActors } from "../SelectedMovieActors";
import { SelectedMovieReviews } from "../SelectedMovieReviews";
import "./selectedMovieDetails.css";

export function SelectedMovieDetails({
	movieData,
	movieError,
	movieLoading,
	idForBtns,
	movieRating,
	movieRatingStyle,
	postersData,
	postersError,
	postersLoading,
	reviewsData,
	isActive,
}) {
	const { description, persons, top10, top250, votes } = movieData;

	const votesSum = countVotes(votes);

	const pagination = {
		clickable: true,
		renderBullet: (index, className) => `<span key=${index} class="${className} selectedMovieDetails-posterBullet"></span>`,
	};

	return (
		<div className={`selectedMovieDetails-wrapper ${isActive && "fade-block"}`}>
			<div className='selectedMovieDetails-left'>
				{postersData?.length > 0 && (
					<div className='selectedMovieDetails-posters'>
						<Swiper
							grabCursor={true}
							effect={"creative"}
							creativeEffect={{
								prev: {
									shadow: true,
									translate: [0, 0, -400],
								},
								next: {
									translate: ["100%", 0, 0],
								},
							}}
							modules={[EffectCreative, Pagination]}
							pagination={pagination}
							loop={true}
							className='mySwiper'
						>
							<ul>
								{postersData?.map((poster, index) => (
									<SwiperSlide key={poster.id + index}>
										<li>
											<Image src={poster.url} />
										</li>
									</SwiperSlide>
								))}
							</ul>
						</Swiper>
					</div>
				)}
				<div className='selectedMovieDetails-movieDetails'>
					{top10 || top250 ? (
						<MovieBadges rating={movieRating} top10={top10} top250={top250} showPlace={top10 || top250} />
					) : (
						<>{movieRating > 0 && <span style={movieRatingStyle}>{movieRating}</span>}</>
					)}
					{votesSum > 0 && <span className='selectedMovieDetails-votes'>{votesSum} оценки</span>}
					{description && <p className='selectedMovieDetails-description'>{description}</p>}

					<SelectedMovieReviews reviewsData={reviewsData} />
				</div>
			</div>
			<SelectedMovieActors persons={persons} idForBtns={idForBtns + 2} />
		</div>
	);
}
