import React from "react";
import "./selectedFilmNav.css";

export function SelectedFilmNav({ activeTab, setActiveTab, movieData, seasonsData }) {
	return (
		<ul className='selectedFilm-nav'>
			<li>
				<button
					className={`selectedFilm-navItem ${activeTab === "about" ? "active" : ""}`}
					onClick={() => setActiveTab("about")}
				>
					{movieData?.type === "movie" ? "О фильме" : "О сериале"}
				</button>
			</li>
			{seasonsData?.length > 0 && (
				<li>
					<button
						className={`selectedFilm-navItem ${activeTab === "series" ? "active" : ""}`}
						onClick={() => setActiveTab("series")}
					>
						Сезоны и серии
					</button>
				</li>
			)}
			<li>
				<button
					className={`selectedFilm-navItem ${activeTab === "details" ? "active" : ""}`}
					onClick={() => setActiveTab("details")}
				>
					Детали
				</button>
			</li>
			<li>
				<button
					className={`selectedFilm-navItem ${activeTab === "similar" ? "active" : ""}`}
					onClick={() => setActiveTab("similar")}
				>
					Подобные
				</button>
			</li>
		</ul>
	);
}
