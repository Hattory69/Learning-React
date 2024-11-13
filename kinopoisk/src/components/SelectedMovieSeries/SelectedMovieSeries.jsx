import React, { useState } from "react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { calcSlidesPerView } from "../../HelperFunctions/calcSlidesPerView";
import { useSlidesPerView } from "../../HelperFunctions/useSlidesPerView";
import { DefaultCarousel } from "../DefaultCarousel/DefaultCarousel";
import { SelectedMovieSeriesItem } from "../SelectedMovieSeriesItem/SelectedMovieSeriesItem";
import "./selectedMovieSeries.css";

export function SelectedMovieSeries({ idForBtns, seasonsData, seasonsError, seasonsLoading, isActive }) {
	const [curSeason, setCurSeason] = useState(0);
	const [slideToFirst, setSlideToFirst] = useState(false);
	const [slidesPerView, setSlidesPerView] = useState(calcSlidesPerView());

	useSlidesPerView(setSlidesPerView);

	const sortedSeasonsData = [...seasonsData].sort((a, b) => a?.number - b?.number);
	const seasonsNames = sortedSeasonsData?.map((season) => season.name);

	function handlePaginationChange(swiper) {
		setCurSeason(swiper.activeIndex);
		setSlideToFirst(swiper.activeIndex);
	}

	const pagination = {
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + seasonsNames[index] + "</span>";
		},
	};

	return (
		<div className={`selectedMovieSeries-wrapper ${isActive && "fade-block"}`}>
			<div className='selectedMovieSeries-pagination'>
				<Swiper pagination={pagination} modules={[Pagination]} allowTouchMove={false} onSlideChange={handlePaginationChange}>
					{seasonsData.map((season, index) => (
						<SwiperSlide key={index}>
							<div>{season.name}</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<DefaultCarousel
				loading={seasonsLoading}
				error={seasonsError}
				slidesPerView={slidesPerView}
				showAllSlides={true}
				dataToShow={seasonsData[curSeason]?.episodes || []}
				renderSlide={(episode) => <SelectedMovieSeriesItem episode={episode || []} />}
				idForBtns={idForBtns}
				slideKey={"number"}
				slideToFirst={slideToFirst}
			/>
		</div>
	);
}
