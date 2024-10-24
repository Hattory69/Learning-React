import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import arrow from "../../images/smallArrow.svg";
import { useFetchListQuery } from "../../redux/kinopoiskApi";
import { DefaultCarousel } from "../DefaultCarousel/DefaultCarousel";
import { IconComponent } from "../IconComponent/IconComponent";
import { LinkComponent } from "../LinkComponent/LinkComponent";
import { MovieListItem } from "../MovieListItem/MovieListItem";
import "./carouselForCategories.css";

export function CarouselForCategories({ sectionHeader, searchType, resultAmount, top }) {
	const {
		data: moviesData,
		loading: moviesLoading,
		error: moviesError,
	} = useFetchListQuery({ type: searchType, resultAmount: resultAmount, top: top  });

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
				loading={moviesLoading}
				error={moviesError}
				slidesPerView={7}
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
