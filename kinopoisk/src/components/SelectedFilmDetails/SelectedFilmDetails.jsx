import { Image } from "antd";
import React from "react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { DefaultCarousel } from "../DefaultCarousel/DefaultCarousel";
import { FilmBadges } from "../FilmBadges/FilmBadges";
import { SelectedFilmActor } from "../SelectedFilmActor/SelectedFilmActor";
import "./selectedFilmDetails.css";

export function SelectedFilmDetails({
	movieData,
	movieError,
	movieLoading,
	idForBtns,
	filmRating,
	filmRatingStyle,
	postersData,
	postersError,
	postersLoading,
	isActive,
}) {
	const { description, persons, top10, top250, votes } = movieData;
	
	persons?.sort((a, b) => a?.profession - b?.profession);
	const votesSum = Object.values(votes ?? {}).reduce((acc, votes) => (acc += votes), 0);

	return (
		<div className={`selectedFilmDetails-wrapper ${isActive && "fade-block"}`}>
			<div className='selectedFilmDetails-left'>
				{postersData?.length > 0 && (
					<div className='selectedFilmDetails-posters'>
						<Swiper
							style={{ width: "300px", height: "300px" }}
							effect={"cards"}
							grabCursor={true}
							modules={[EffectCards]}
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
				<div className='selectedFilmDetails-filmDetails'>
					{top10 || top250 ? (
						<FilmBadges
							rating={filmRating}
							top10={top10}
							top250={top250}
							showPlace={top10 || top250}
						/>
					) : (
						<>{filmRating > 0 && <span style={filmRatingStyle}>{filmRating}</span>}</>
					)}
					{votesSum > 0 && <span className='selectedFilmDetails-votes'>{votesSum} оценки</span>}
					{description && <p className='selectedFilmDetails-description'>{description}</p>}
				</div>
			</div>
			<div className='selectedFilmDetails-actors'>
				<DefaultCarousel
					movieError={movieError}
					movieLoading={movieLoading}
					renderSlide={(actor) => <SelectedFilmActor actor={actor || []} />}
					idForBtns={idForBtns + "Actors"}
					dataToShow={persons || []}
					slidesPerView={3}
					slideKey={"id"}
					showAllSlides={true}
				/>
			</div>
		</div>
	);
}
