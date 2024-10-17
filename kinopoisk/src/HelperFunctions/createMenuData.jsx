export function createMenuData(data) {
	function addToMenuData(key, data, valueKey = null) {
		if (data === null || data === undefined) return;

		const item = menuData.find((el) => el.value === key);

		if (Array.isArray(data)) {
			data.forEach((entry) => {
				const value = valueKey ? entry[valueKey] : entry;

				if (item && !item.children.some((child) => child.value === value)) {
					item.children.push({ title: value, value: value, isLeaf: true, key: value, section: key });
				}
			});
			return;
		}

		if (item && !item.children.some((child) => child.value === data)) {
			item.children.push({ title: data, value: data, isLeaf: true, key: data, section: key });
		}
	}

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

	for (const film of data) {
		addToMenuData("year", film.year);
		addToMenuData("ageRating", film.ageRating);
		addToMenuData("countries", film.countries, "name");
	}
	menuData.forEach((item) => {
		item?.children?.sort((a, b) => {
			if (!isNaN(a.value) && !isNaN(b.value)) {
				return a.value - b.value;
			}
			return a.value.localeCompare(b.value);
		});
	});

	return menuData;
}
