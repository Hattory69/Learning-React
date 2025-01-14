interface SelectedMovieTab {
	id: "about" | "series" | "details" | "similar";
	getLabel: (type?: string) => string;
}

export const selectedMovieTabs: SelectedMovieTab[] = [
	{ id: "about", getLabel: (type) => (type === "movie" ? "О фильме" : "О сериале") },
	{ id: "series", getLabel: () => "Сезоны и серии" },
	{ id: "details", getLabel: () => "Детали" },
	{ id: "similar", getLabel: () => "Подобные" },
];
