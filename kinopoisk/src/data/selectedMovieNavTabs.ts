interface SelectedMovieTab {
	id: string;
	label: (type?: string) => string;
}

export const selectedMovieTabs: SelectedMovieTab[] = [
	{ id: "about", label: (type) => (type === "movie" ? "О фильме" : "О сериале") },
	{ id: "series", label: () => "Сезоны и серии" },
	{ id: "details", label: () => "Детали" },
	{ id: "similar", label: () => "Подобные" },
];
