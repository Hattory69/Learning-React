import { Image } from "antd";
import React from "react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { DefaultCarousel } from "../DefaultCarousel/DefaultCarousel";
import { FilmBadges } from "../FilmBadges/FilmBadges";
import { SelectedFilmActor } from "../SelectedFilmActor/SelectedFilmActor";

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
}) {
	const { description, persons, top10, top250, votes } = movieData;
	persons?.sort((a, b) => a?.profession - b?.profession);
	const votesSum = Object.values(votes ?? {}).reduce((acc, votes) => (acc += votes), 0);

	return (
		<div>
			<>
				{postersData.length > 0 && (
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
				)}
			</>
			{top10 || top250 ? (
				<FilmBadges
					rating={filmRating}
					top10={top10}
					top250={top250}
					showPlace={top10 || top250}
				/>
			) : (
				<span style={filmRatingStyle}>{filmRating}</span>
			)}
			<span>{votesSum} оценки</span>
			<p>{description}</p>
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
	);
}
