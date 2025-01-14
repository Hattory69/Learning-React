interface MainPageCategory {
	sectionHeader: string;
	searchType: string;
}

export const mainPageCategories: MainPageCategory[] = [
	{
		sectionHeader: "Топ 250",
		searchType: "top250",
	},
	{
		sectionHeader: "Лучшие фильмы",
		searchType: "movie",
	},
	{
		sectionHeader: "Сериалы",
		searchType: "tv-series",
	},
	{
		sectionHeader: "Мультфильмы",
		searchType: "cartoon",
	},
	{
		sectionHeader: "Аниме",
		searchType: "anime",
	},
];
