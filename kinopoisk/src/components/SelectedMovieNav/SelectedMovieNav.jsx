import React from "react";
import { selectedMovieTabs } from "~data/selectedMovieNavTabs";
import "./selectedMovieNav.css";

export function SelectedMovieNav({ activeTab, setActiveTab, movieData, seasonsData }) {
	return (
		<ul className='selectedMovie-nav'>
			{selectedMovieTabs.map(
				({ id, label }) =>
					(id !== "series" || seasonsData?.length > 0) && (
						<li key={id}>
							<button className={`selectedMovie-navItem ${activeTab === id ? "active" : ""}`} onClick={() => setActiveTab(id)}>
								{label(movieData?.type)}
							</button>
						</li>
					)
			)}
		</ul>
	);
}
