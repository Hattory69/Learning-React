import { CloseOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useFetch } from "../../HelperFunctions/useFetch";
import { SearchItem } from "../SearchItem/SearchItem";
import "./headerSearch.css";

export function HeaderSearch({ setShowSearchInput, isSearchOpen, setIsSearchOpen }) {
	const { loading: moviesLoading, error: moviesError, data: moviesData, handleFetch: loadMovies } = useFetch();
	const [options, setOptions] = useState([]);
	const [searchVal, setSearchVal] = useState("");
	const [timer, setTimer] = useState(null);
	const [prevFetchVal, setPrevFetchVal] = useState(null);

	function handleFetchMovies(searchType, resultsAmm, inputVal) {
		setIsSearchOpen(true);
		if ((moviesData && searchVal === "") || prevFetchVal === inputVal) return;

		if (searchVal === "") {
			loadMovies("top10", 10);
			return;
		}

		setPrevFetchVal(inputVal);
		loadMovies(searchType, resultsAmm, inputVal);
	}

	function handleSearchChange(value) {
		setSearchVal(value);

		if (timer) {
			clearTimeout(timer);
		}

		const newTimer = setTimeout(() => {
			handleFetchMovies("searchItem", 10, value);
		}, 1000);

		return setTimer(newTimer);
	}

	useEffect(() => {
		if (moviesData) {
			const moviesOptions = moviesData.map((film) => ({
				key: film.id,
				value: film.name || film.alternativeName,
				label: <SearchItem film={film} />,
			}));

			setOptions(moviesOptions);
		}
	}, [moviesData]);

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
						{searchVal === "" && <span>Входит в топ 10 за месяц</span>}
						{menu}
					</div>
				)}
			>
				<Input
					placeholder='Введите текст для поиска'
					value={searchVal}
					onChange={(e) => handleSearchChange(e.target.value)}
					onFocus={handleFetchMovies}
					suffix
				/>
			</AutoComplete>
			<button onClick={() => setShowSearchInput(false)}>
				<CloseOutlined className='header-icons' />
			</button>
		</>
	);
}
