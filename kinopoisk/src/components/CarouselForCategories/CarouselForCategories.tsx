import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { DefaultCarousel } from "~components/DefaultCarousel";
import { IconComponent } from "~components/IconComponent";
import { LinkComponent } from "~components/LinkComponent";
import { MovieListItem } from "~components/MovieListItem";
import { SWIPER_WINDOW_WIDE_BREAKPOINTS } from "~data/constants";
import arrow from "~images/smallArrow.svg";
import { useFetchListQuery } from "~redux/kinopoiskApi";
import "./carouselForCategories.css";

interface ICarouselForCategories {
	sectionHeader: string,
	searchType: string,
}

export function CarouselForCategories({ sectionHeader, searchType }: ICarouselForCategories) {
	const {
		data: { docs: moviesData } = {},
	} = useFetchListQuery({ type: searchType, resultAmount: 14 });

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
				dataToShow={moviesData || []}
				renderSlide={(movie) => <MovieListItem movie={movie} />}
				sectionHeader={sectionHeader}
				idForBtns={searchType}
				searchType={searchType}
				showMoreBtn={true}
				slideKey={"id"}
				breakpoints={SWIPER_WINDOW_WIDE_BREAKPOINTS}
			/>
		</section>
	);
}
