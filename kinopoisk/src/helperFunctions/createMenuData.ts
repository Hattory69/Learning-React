import { IMovieCountry } from "~types/types";

interface MovieData {
	countries: IMovieCountry[] | null;
	ageRating: string | null;
	year: number | null;
}

export interface IMenuItem {
	title: string | number;
	value: string | number;
	selectable: boolean;
	children?: IMenuItem[];
	isLeaf?: true;
	key: string | number;
	section?: string;
}

const uniqueMenuChild = (children: IMenuItem[], value: string | number | null, section: string): IMenuItem | undefined => {
	if (!children.some((child) => child?.value === value) && value !== null) {
		return { title: value, value, isLeaf: true, key: value, section, selectable: true };
	}
	return;
};

export function createMenuData(data: MovieData[]) {
	const menuData: IMenuItem[] = [
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
		const yearChild = uniqueMenuChild(menuData[0].children ?? [], year, "year");
		if (yearChild) menuData[0].children?.push(yearChild);

		const ageRatingChild = uniqueMenuChild(menuData[1].children ?? [], ageRating, "ageRating");
		if (ageRatingChild) menuData[1].children?.push(ageRatingChild);

		countries?.forEach((country) => {
			const countryChild = uniqueMenuChild(menuData[2].children ?? [], country.name, "countries");
			if (countryChild) menuData[2].children?.push(countryChild);
		});
	});

	menuData.forEach((param) => {
		param.children?.sort((a: IMenuItem, b: IMenuItem) => {
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
