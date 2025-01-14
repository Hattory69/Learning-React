import React, { useEffect } from "react";
import { mainPageCategories } from "~data/mainPageCategories";
import { CarouselForCategories } from "~components/CarouselForCategories";
import { MainPageTop } from "~components/MainPageTop";
import "./mainPage.css";

export function MainPage() {
	useEffect(() => {
		document.title = `Онлайн кинотеатр Кинопоиск`;
	}, []);

	return (
		<>
			<MainPageTop />
			<div className='mainPage-contentWrapper'>
				{mainPageCategories.map(({ sectionHeader, searchType }, index) => (
					<CarouselForCategories key={sectionHeader + index} sectionHeader={sectionHeader} searchType={searchType} />
				))}
			</div>
		</>
	);
}
