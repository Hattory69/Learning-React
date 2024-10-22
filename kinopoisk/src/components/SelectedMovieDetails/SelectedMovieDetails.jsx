import { Image } from "antd";
import React from "react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { EffectCards, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { DefaultCarousel } from "../DefaultCarousel/DefaultCarousel";
import { MovieBadges } from "../MovieBadges/MovieBadges";
import { SelectedMovieActor } from "../SelectedMovieActor/SelectedMovieActor";
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
	isActive,
}) {
	const { description, persons, top10, top250, votes } = movieData;

	const sortedActors = [...persons]?.sort((a, b) => a?.profession - b?.profession);
	const votesSum = Object.values(votes ?? {}).reduce((acc, votes) => (acc += votes), 0);

	const pagination = {
		clickable: true,
		renderBullet: (index, className) => (
			`<span key=${index} class="${className} selectedMovieDetails-posterBullet"></span>`
		),
	};

	return (
		<div className={`selectedMovieDetails-wrapper ${isActive && "fade-block"}`}>
			<div className='selectedMovieDetails-left'>
				{postersData?.length > 0 && (
					<div className='selectedMovieDetails-posters'>
						<Swiper
							effect={"cards"}
							grabCursor={true}
							modules={[EffectCards, Pagination]}
							pagination={pagination}
							className='mySwiper'
							loop={true}
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
				<div className='selectedMovieDetails-MovieDetails'>
					{top10 || top250 ? (
						<MovieBadges
							rating={movieRating}
							top10={top10}
							top250={top250}
							showPlace={top10 || top250}
						/>
					) : (
						<>{movieRating > 0 && <span style={movieRatingStyle}>{movieRating}</span>}</>
					)}
					{votesSum > 0 && <span className='selectedMovieDetails-votes'>{votesSum} оценки</span>}
					{description && <p className='selectedMovieDetails-description'>{description}</p>}
				</div>
			</div>
			<div className='selectedMovieDetails-actors'>
				<DefaultCarousel
					movieError={movieError}
					movieLoading={movieLoading}
					renderSlide={(actor) => <SelectedMovieActor actor={actor || []} />}
					idForBtns={idForBtns + "Actors"}
					dataToShow={sortedActors || []}
					slidesPerView={3}
					slideKey={"id"}
					showAllSlides={true}
				/>
			</div>
		</div>
	);
}
