import React, { useState } from "react";
import { Swiper as SwiperInstance } from "swiper";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { DefaultCarousel } from "~components/DefaultCarousel";
import { SelectedMovieSeriesItem } from "~components/SelectedMovieSeriesItem";
import { ISeries } from "~types/types";
import "./selectedMovieSeries.css";

interface ISelectedMovieSeries {
	idForBtns: string | undefined,
	seasonsData: ISeries[],
	isActive: boolean,
}

export function SelectedMovieSeries({ idForBtns, seasonsData, isActive }: ISelectedMovieSeries) {
	const [curSeason, setCurSeason] = useState(0);
	const [slideToFirst, setSlideToFirst] = useState(true);

	const sortedSeasonsData = [...seasonsData].sort((a, b) => a?.number - b?.number);
	const seasonsNames = sortedSeasonsData?.map((season) => season.name);

	function handlePaginationChange(swiper: SwiperInstance) {
		setCurSeason(swiper.activeIndex);
		setSlideToFirst(swiper.activeIndex === 0);
	}

	const pagination = {
		clickable: true,
		renderBullet: function (index: number, className: string) {
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
				dataToShow={seasonsData[curSeason]?.episodes || []}
				renderSlide={(episode) => <SelectedMovieSeriesItem episode={episode || []} />}
				idForBtns={idForBtns}
				slideKey={"number"}
				slideToFirst={slideToFirst}
			/>
		</div>
	);
}
