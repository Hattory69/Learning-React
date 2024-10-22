import React from "react";
import "./selectedMovieNav.css";

export function SelectedMovieNav({ activeTab, setActiveTab, movieData, seasonsData }) {
	return (
		<ul className='selectedMovie-nav'>
			<li>
				<button
					className={`selectedMovie-navItem ${activeTab === "about" ? "active" : ""}`}
					onClick={() => setActiveTab("about")}
				>
					{movieData?.type === "movie" ? "О фильме" : "О сериале"}
				</button>
			</li>
			{seasonsData?.length > 0 && (
				<li>
					<button
						className={`selectedMovie-navItem ${activeTab === "series" ? "active" : ""}`}
						onClick={() => setActiveTab("series")}
					>
						Сезоны и серии
					</button>
				</li>
			)}
			<li>
				<button
					className={`selectedMovie-navItem ${activeTab === "details" ? "active" : ""}`}
					onClick={() => setActiveTab("details")}
				>
					Детали
				</button>
			</li>
			<li>
				<button
					className={`selectedMovie-navItem ${activeTab === "similar" ? "active" : ""}`}
					onClick={() => setActiveTab("similar")}
				>
					Подобные
				</button>
			</li>
		</ul>
	);
}
