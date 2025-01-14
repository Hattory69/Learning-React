import React from "react";
import { IconComponent } from "~components/IconComponent";
import blankIng from "~images/test.svg";
import { ISeriesEpisodes } from "~types/types";
import "./selectedMovieSeriesItem.css";

export function SelectedMovieSeriesItem({ episode }: { episode: ISeriesEpisodes }) {
	const { name, description, number } = episode;
	return (
		<>
			<div className='selectedMovieSeriesItem-imgWrapper'>
				<IconComponent icon={blankIng} iconStyle={"selectedMovieSeriesItem-img"} />
			</div>
			<div className='selectedMovieSeriesItem-about'>
				<h3>
					{number}. {name}
				</h3>
				<p>{description || "Описание отсутствует"} </p>
			</div>
		</>
	);
}
