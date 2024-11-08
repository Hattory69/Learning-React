const uniqueMenuChild = (children, title, value, section) => {
	// проверяем menuData на наличие подобного value
	if (!children.some((child) => child?.value === value) && value !== null) {
		return { title, value, isLeaf: true, key: value, section };
	}
};

export function createMenuData(data) {
	const menuData = [
		{
			title: "Год выхода",
			value: "year",
			selectable: false,
			children: [],
			key: "year",
		},
		{
			title: "Возрастной рейтинг",
			value: "ageRating",
			selectable: false,
			children: [],
			key: "ageRating",
		},
		{
			title: "Страна производства",
			value: "countries",
			selectable: false,
			children: [],
			key: "countries",
		},
	];

	data.forEach((movie) => {
		const { year, ageRating, countries } = movie;
		const yearChild = uniqueMenuChild(menuData[0].children, year, year, "year");
		if (yearChild) menuData[0].children.push(yearChild);

		const ageRatingChild = uniqueMenuChild(menuData[1].children, ageRating, ageRating, "ageRating");
		if (ageRatingChild) menuData[1].children.push(ageRatingChild);

		countries.forEach((country) => {
			const countryChild = uniqueMenuChild(menuData[2].children, country.name, country.name, "countries");
			if (countryChild) menuData[2].children.push(countryChild);
		});
	});
	menuData.forEach((param) => {
		param.children?.sort((a, b) => {
			if (!isNaN(a.value) && !isNaN(b.value)) {
				return a.value - b.value;
			}
			return a.value.localeCompare(b.value);
		});
	});
	return menuData;
}
