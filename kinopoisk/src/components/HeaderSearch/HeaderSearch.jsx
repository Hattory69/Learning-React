import { CloseOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import React, { useEffect, useState } from "react";
import { TOP_10 } from "~data/constants";
import { useFetchListQuery, useSearchItemQuery } from "~redux/kinopoiskApi";
import { SearchItem } from "../SearchItem";
import "./headerSearch.css";

export function HeaderSearch({ setShowSearchInput, isSearchOpen, setIsSearchOpen }) {
	const [options, setOptions] = useState([]);
	const [searchVal, setSearchVal] = useState("");
	const [timer, setTimer] = useState(null);
	const [prevFetchVal, setPrevFetchVal] = useState(null);

	const [query, setQuery] = useState("");
	const { data: { docs: top10Movies } = {} } = useFetchListQuery({ resultAmount: 10, type: TOP_10 });
	const { data: { docs: moviesData } = {} } = useSearchItemQuery(query, {
		skip: !query,
	});

	const isDataEmpty = searchVal === "";

	function handleFetchMovies(inputVal) {
		setIsSearchOpen(true);

		if (prevFetchVal === inputVal) return;

		if (isDataEmpty) {
			setQuery("");
			return;
		}

		setPrevFetchVal(inputVal);
		setQuery(inputVal);
	}

	function handleSearchChange(value) {
		setSearchVal(value);

		if (timer) {
			clearTimeout(timer);
		}

		const newTimer = setTimeout(() => {
			handleFetchMovies(value);
		}, 1000);

		return setTimer(newTimer);
	}

	function handleSearchData(data) {
		return data?.map((movie) => ({
			key: movie.id,
			value: searchVal,
			label: <SearchItem movie={movie} />,
		}));
	}

	useEffect(() => {
		if (isDataEmpty && top10Movies) {
			const top10Options = handleSearchData(top10Movies);
			setOptions(top10Options);
		} else if (moviesData) {
			const moviesOptions = handleSearchData(moviesData);
			setOptions(moviesOptions);
		}
	}, [moviesData, searchVal, query, top10Movies]);

	return (
		<>
			<AutoComplete
				options={isSearchOpen && options}
				allowClear
				onSelect={() => setIsSearchOpen(false)}
				listHeight={500}
				open={isSearchOpen}
				onBlur={() => setIsSearchOpen(false)}
				dropdownRender={(menu) => (
					<div>
						{isDataEmpty && <span>Входит в топ 10 за месяц</span>}
						{menu}
					</div>
				)}
			>
				<Input
					placeholder='Введите название фильма или сериала'
					value={searchVal}
					onChange={(e) => handleSearchChange(e.target.value)}
					onFocus={() => handleSearchChange(searchVal)}
				/>
			</AutoComplete>
			<button onClick={() => setShowSearchInput(false)}>
				<CloseOutlined className='header-icons' />
			</button>
		</>
	);
}
