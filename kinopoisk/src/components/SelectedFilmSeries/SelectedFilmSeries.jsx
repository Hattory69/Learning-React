import React, { useState } from "react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { DefaultCarousel } from "../DefaultCarousel/DefaultCarousel";
import { SelectedFilmSeriesItem } from "../SelectedFilmSeriesItem/SelectedFilmSeriesItem";
import "./selectedFilmSeries.css";

export function SelectedFilmSeries({ idForBtns, seasonsData, seasonsError, seasonsLoading }) {
	const [curSeason, setCurSeason] = useState(0);
	const [slideToFirst, setSlideToFirst] = useState(false);

	seasonsData.sort((a, b) => a?.number - b?.number);
	const seasonsNames = seasonsData?.map((season) => season.name);

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
		<div className='selectedFilmSeries-wrapper'>
			<div className='selectedFilmSeries-pagination'>
				<Swiper
					pagination={pagination}
					modules={[Pagination]}
					allowTouchMove={false}
					onSlideChange={handlePaginationChange}
				>
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
				slidesPerView={5}
				showAllSlides={true}
				dataToShow={seasonsData[curSeason]?.episodes || []}
				renderSlide={(episode) => <SelectedFilmSeriesItem episode={episode || []} />}
				idForBtns={idForBtns}
				slideKey={"number"}
				slideToFirst={slideToFirst}
			/>
		</div>
	);
}
