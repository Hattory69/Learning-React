import React from "react";
import { mainPageCategories } from "../../data/mainPageCategories";
import { CarouselForCategories } from "../CarouselForCategories/CarouselForCategories";
import { MainPageTop } from "../MainPageTop/MainPageTop";
import "./mainPage.css";

export function MainPage() {
	return (
		<>
			<MainPageTop />
			<div className='mainPage-contentWrapper'>
				{mainPageCategories.map(({ sectionHeader, searchType, resultAmount }, index) => (
					<CarouselForCategories
						key={sectionHeader + index}
						sectionHeader={sectionHeader}
						searchType={searchType}
						resultAmount={resultAmount}
					/>
				))}
			</div>
		</>
	);
}
