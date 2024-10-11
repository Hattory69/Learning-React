import React from "react";

export function SelectedFilmNav({ setActiveTab, movieData, seasonsData }) {
	return (
		<ul className='selectedFilm-nav'>
			<li>
				<button
					className='selectedFilm-navItem'
					onClick={() => setActiveTab("about")}
				>
					{movieData?.type === "movie" ? "О фильме" : "О сериале"}
				</button>
			</li>
			{seasonsData?.length > 0 && (
				<li>
					<button
						className='selectedFilm-navItem'
						onClick={() => setActiveTab("series")}
					>
						Сезоны и серии
					</button>
				</li>
			)}
			<li>
				<button
					className='selectedFilm-navItem'
					onClick={() => setActiveTab("details")}
				>
					Детали
				</button>
			</li>
			<li>
				<button
					className='selectedFilm-navItem'
					onClick={() => setActiveTab("similar")}
				>
					Подобные
				</button>
			</li>
		</ul>
	);
}
