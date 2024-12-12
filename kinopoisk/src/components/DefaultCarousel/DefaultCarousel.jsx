import { ArrowRightOutlined } from "@ant-design/icons";
import React, { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SPACE_BETWEEN_SLIDES } from "~data/constants";
import { LinkComponent } from "../LinkComponent";
import "./defaultCarousel.css";

export function DefaultCarousel({
	loading,
	error,
	searchType,
	idForBtns,
	renderSlide,
	sectionHeader,
	showMoreBtn,
	dataToShow,
	slideKey,
	slideToFirst,
	breakpoints,
}) {
	const prevButtonClass = `swiper-button-prev-${idForBtns}`;
	const nextButtonClass = `swiper-button-next-${idForBtns}`;

	const swiperRef = useRef(null);

	useEffect(() => {
		swiperRef?.current?.swiper?.slideTo(0);
	}, [slideToFirst]);

	return (
		<>
			{loading && <div>Загрузка...</div>}
			{error && <div>Ошибка: {error}</div>}
			<div className='defaultCarousel-swiperContainer'>
				<div className={prevButtonClass}>
					<ArrowRightOutlined />
				</div>
				<Swiper
					ref={swiperRef}
					modules={[Navigation]}
					spaceBetween={SPACE_BETWEEN_SLIDES}
					slidesPerView='auto'
					slidesPerGroupAuto={true}
					speed={1000}
					navigation={{
						nextEl: `.${nextButtonClass}`,
						prevEl: `.${prevButtonClass}`,
						disabledClass: "swiper-button-disabled",
					}}
					simulateTouch={true}
					allowTouchMove={true}
					touchRatio={1}
					breakpoints={breakpoints || {}}
				>
					{dataToShow.map((slide, index) => (
						<SwiperSlide key={`${slide[slideKey]}-${index}`}>{renderSlide(slide)}</SwiperSlide>
					))}
					{showMoreBtn && (
						<SwiperSlide className='defaultCarousel-viewAllWrapper'>
							<span className='defaultCarousel-viewAllText'>
								<ArrowRightOutlined className='defaultCarousel-arrowSvg' />
								Показать всё
							</span>
							<LinkComponent url={`/section/${sectionHeader}/${searchType}`} />
						</SwiperSlide>
					)}
				</Swiper>
				<div className={nextButtonClass}>
					<ArrowRightOutlined />
				</div>
			</div>
		</>
	);
}
