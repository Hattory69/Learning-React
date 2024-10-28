import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import arrow from "../../images/smallArrow.svg";
import { useFetchListQuery } from "../../redux/kinopoiskApi";
import { DefaultCarousel } from "../DefaultCarousel/DefaultCarousel";
import { IconComponent } from "../IconComponent/IconComponent";
import { LinkComponent } from "../LinkComponent/LinkComponent";
import { MovieListItem } from "../MovieListItem/MovieListItem";
import "./carouselForCategories.css";

export function CarouselForCategories({ sectionHeader, searchType, top, resultAmount }) {
	const [slidesPerView, setSlidesPerView] = useState(7);
	const spaceBetweenSlides = 15;
	const minSlideWidth = 250;

	const {
		data: moviesData,
		loading: moviesLoading,
		error: moviesError,
	} = useFetchListQuery({ type: searchType, resultAmount: resultAmount, top: top });

	const updateSlidesPerView = () => {
		const containerWidth = window.innerWidth;
		const maxSlides = Math.floor(containerWidth / (minSlideWidth + spaceBetweenSlides));
		setSlidesPerView(maxSlides);
	};

	useEffect(() => {
		updateSlidesPerView();

		window.addEventListener("resize", updateSlidesPerView);

		return () => window.removeEventListener("resize", updateSlidesPerView);
	}, []);

	return (
		<section className='carouselForCategories-categoryWrapper'>
			<div className='carouselForCategories-titleWrapper'>
				<h2 className='carouselForCategories-categoryTitle'>
					{sectionHeader}
					<IconComponent
						icon={arrow}
						iconStyle={"arrowIcon"}
					/>
					<LinkComponent url={`/section/${sectionHeader}/${searchType}`} />
				</h2>
			</div>
			<DefaultCarousel
				spaceBetweenSlides={spaceBetweenSlides}
				loading={moviesLoading}
				error={moviesError}
				slidesPerView={slidesPerView}
				dataToShow={moviesData || []}
				showAllSlides={false}
				renderSlide={(movie) => <MovieListItem movie={movie} />}
				sectionHeader={sectionHeader}
				idForBtns={searchType}
				searchType={searchType}
				showMoreBtn={true}
				slideKey={"id"}
			/>
		</section>
	);
}
