import React, { SetStateAction } from "react";
import { selectedMovieTabs } from "~data/selectedMovieNavTabs";
import { IMovie, ISeries } from "~types/types";
import "./selectedMovieNav.css";

interface ISelectedMovieNav {
	activeTab: string,
	setActiveTab: React.Dispatch<SetStateAction<"about" | "series" | "details" | "similar">>,
	movieData: IMovie,
	seasonsData: ISeries[],

}

export function SelectedMovieNav({ activeTab, setActiveTab, movieData, seasonsData }: ISelectedMovieNav) {
	return (
		<ul className='selectedMovie-nav'>
			{selectedMovieTabs.map(
				({ id, getLabel: getLabel }) =>
					(id !== "series" || seasonsData?.length > 0) && (
						<li key={id}>
							<button className={`selectedMovie-navItem ${activeTab === id ? "active" : ""}`} onClick={() => setActiveTab(id)}>
								{getLabel(movieData?.type)}
							</button>
						</li>
					)
			)}
		</ul>
	);
}
