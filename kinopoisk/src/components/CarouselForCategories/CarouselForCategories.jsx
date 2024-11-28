import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import arrow from "~images/smallArrow.svg";
import { useFetchListQuery } from "~redux/kinopoiskApi";
import { DefaultCarousel } from "../DefaultCarousel";
import { IconComponent } from "../IconComponent";
import { LinkComponent } from "../LinkComponent";
import { MovieListItem } from "../MovieListItem";
import "./carouselForCategories.css";

export function CarouselForCategories({ sectionHeader, searchType, top }) {
	const {
		data: { docs: moviesData } = {},
		loading: moviesLoading,
		error: moviesError,
	} = useFetchListQuery({ type: searchType, resultAmount: 14, top: top });

	return (
		<section className='carouselForCategories-categoryWrapper'>
			<div className='carouselForCategories-titleWrapper'>
				<h2 className='carouselForCategories-categoryTitle'>
					{sectionHeader}
					<IconComponent icon={arrow} iconStyle={"arrowIcon"} />
					<LinkComponent url={`/section/${sectionHeader}/${searchType}`} />
				</h2>
			</div>
			<DefaultCarousel
				loading={moviesLoading}
				error={moviesError}
				dataToShow={moviesData || []}
				showAllSlides={false}
				renderSlide={(movie) => <MovieListItem movie={movie} />}
				sectionHeader={sectionHeader}
				idForBtns={searchType}
				searchType={searchType}
				showMoreBtn={true}
				slideKey={"id"}
				breakpoints={{
					1024: {
						simulateTouch: false,
						allowTouchMove: false,
					},
				}}
			/>
		</section>
	);
}
