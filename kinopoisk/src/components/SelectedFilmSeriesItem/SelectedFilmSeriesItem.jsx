import React from "react";
import blankIng from "../../images/test.svg";
import { IconComponent } from "../IconComponent/IconComponent";
import "./selectedFilmSeriesItem.css";

export function SelectedFilmSeriesItem({ episode }) {
	const { name, description, number } = episode;
	return (
		<>
			<div className='selectedFilmSeriesItem-imgWrapper'>
				<IconComponent
					icon={blankIng}
					iconStyle={"selectedFilmSeriesItem-img"}
				/>
			</div>
			<div className='selectedFilmSeriesItem-about'>
				<h3>
					{number}. {name}
				</h3>
				<p>{description || "Описание отсутствует"} </p>
			</div>
		</>
	);
}
