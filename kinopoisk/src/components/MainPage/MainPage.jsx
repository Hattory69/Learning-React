import React, { useEffect } from "react";
import { mainPageCategories } from "~data/mainPageCategories";
import { CarouselForCategories } from "../CarouselForCategories";
import { MainPageTop } from "../MainPageTop";
import "./mainPage.css";

export function MainPage() {
	useEffect(() => {
		document.title = `Онлайн кинотеатр Кинопоиск`;
	}, []);

	return (
		<>
			<MainPageTop />
			<div className='mainPage-contentWrapper'>
				{mainPageCategories.map(({ sectionHeader, searchType, top }, index) => (
					<CarouselForCategories key={sectionHeader + index} sectionHeader={sectionHeader} searchType={searchType} top={top} />
				))}
			</div>
		</>
	);
}
