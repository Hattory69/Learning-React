import React, { useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { useFetch } from "../../HelperFunctions/useFetch";
import arrow from "../../images/smallArrow.svg";
import { DefaultCarousel } from "../DefaultCarousel/DefaultCarousel";
import { IconComponent } from "../IconComponent/IconComponent";
import { LinkComponent } from "../LinkComponent/LinkComponent";
import { MovieListItem } from "../MovieListItem/MovieListItem";
import "./carouselForCategories.css";

export function CarouselForCategories({ sectionHeader, searchType, resultAmount }) {
	const { loading: movieLoading, error: movieError, data: movieData, handleFetch: loadMovie } = useFetch();

	useEffect(() => {
		loadMovie(searchType, resultAmount);
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
				loading={movieLoading}
				error={movieError}
				slidesPerView={7}
				dataToShow={movieData || []}
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
