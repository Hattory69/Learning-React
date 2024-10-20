import React, { useEffect } from "react";
import { mainPageCategories } from "../../data/mainPageCategories";
import { CarouselForCategories } from "../CarouselForCategories/CarouselForCategories";
import { MainPageTop } from "../MainPageTop/MainPageTop";
import "./mainPage.css";

export function MainPage() {
	useEffect(() => {
		document.title = `Онлайн кинотеатр Кинопоиск`;
	}, []);
	return (
		<>
			<MainPageTop />
			<div className='mainPage-contentWrapper'>
				{mainPageCategories.map(({ sectionHeader, searchType, resultAmount, top }, index) => (
					<CarouselForCategories
						key={sectionHeader + index}
						sectionHeader={sectionHeader}
						searchType={searchType}
						resultAmount={resultAmount}
						top={top}
					/>
				))}
			</div>
		</>
	);
}
