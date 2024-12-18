interface MovieData {
	countries: MovieCountry[] | null;
	ageRating: string | null;
	year: number | null;
}

interface MovieCountry {
	name: string;
}

interface MenuParentItem {
	title: string;
	value: string;
	selectable: false;
	children: MenuChildItem[];
	key: string;
}

interface MenuChildItem {
	title: string | number;
	value: string | number;
	isLeaf: true;
	key: string | number;
	section: string;
}

const uniqueMenuChild = (children: MenuChildItem[], value: string | number | null, section: string): MenuChildItem | undefined => {
	if (!children.some((child) => child?.value === value) && value !== null) {
		return { title: value, value, isLeaf: true, key: value, section };
	}
	return;
};

export function createMenuData(data: MovieData[]) {
	const menuData: MenuParentItem[] = [
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

	data?.forEach((movie) => {
		const { year, ageRating, countries } = movie;
		const yearChild = uniqueMenuChild(menuData[0].children, year, "year");
		if (yearChild) menuData[0].children.push(yearChild);

		const ageRatingChild = uniqueMenuChild(menuData[1].children, ageRating, "ageRating");
		if (ageRatingChild) menuData[1].children.push(ageRatingChild);

		countries?.forEach((country) => {
			const countryChild = uniqueMenuChild(menuData[2].children, country.name, "countries");
			if (countryChild) menuData[2].children.push(countryChild);
		});
	});

	menuData.forEach((param) => {
		param.children?.sort((a: MenuChildItem, b: MenuChildItem) => {
			if (typeof a.value === "number" && typeof b.value === "number") {
				return a.value - b.value;
			} else if (typeof a.value === "string" && typeof b.value === "string") {
				return a.value.localeCompare(b.value);
			} else if (typeof a.value === "number") {
				return -1;
			} else {
				return 1;
			}
		});
	});
	return menuData;
}
