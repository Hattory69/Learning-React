import React from "react";
import { CarouselForCategories } from "../CarouselForCategories/CarouselForCategories";
import { MainPageTop } from "../MainPageTop/MainPageTop";

export function MainPage() {
	return (
		<section>
			<MainPageTop />
			<CarouselForCategories
				sectionHeader={"Toп 250"}
				searchType={"top250"}
				resultAmount={14}
			/>
			<CarouselForCategories
				sectionHeader={"Лучшие фильмы"}
				searchType={"topMovies"}
				resultAmount={14}
			/>
			<CarouselForCategories
				sectionHeader={"Сериалы"}
				searchType={"topTVSeries"}
				resultAmount={14}
			/>
			<CarouselForCategories
				sectionHeader={"Мультфильмы"}
				searchType={"topCartoons"}
				resultAmount={14}
			/>
			<CarouselForCategories
				sectionHeader={"Аниме"}
				searchType={"topAnime"}
				resultAmount={14}
			/>
		</section>
	);
}
