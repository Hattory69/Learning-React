import { CloseOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import React, { useEffect, useState } from "react";
import { SearchItem } from "~components/SearchItem";
import { TOP_10 } from "~data/constants";
import { useFetchListQuery, useSearchItemQuery } from "~redux/kinopoiskApi";
import { IMovie } from "~types/types";
import "./headerSearch.css";

interface IHeaderSearch {
  setShowSearchInput: React.Dispatch<React.SetStateAction<boolean>>,
  isSearchOpen: boolean,
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

interface IMovieOption {
  key: number,
  value: string | null,
  label: React.ReactElement
}

export function HeaderSearch({ setShowSearchInput, isSearchOpen, setIsSearchOpen }: IHeaderSearch) {
  const [options, setOptions] = useState<IMovieOption[] | []>([]);
  const [searchVal, setSearchVal] = useState<string>('');
  const [timer, setTimer] = useState<number | NodeJS.Timeout | null>(null);
  const [prevFetchVal, setPrevFetchVal] = useState<string | null>(null);
  const [query, setQuery] = useState<string | null>(null);
  const { data: { docs: top10Movies } = {} } = useFetchListQuery({ resultAmount: 10, type: TOP_10 });
  const { data: { docs: moviesData } = {} } = useSearchItemQuery(query, {
    skip: !query,
  });


  function handleFetchMovies(inputVal: string | null) {
    setIsSearchOpen(true);

    if (prevFetchVal === inputVal) return;

    if (searchVal === "") {
      setQuery("");
      return;
    }

    setPrevFetchVal(inputVal);
    setQuery(inputVal);
  }

  function handleSearchChange(value: string) {
    setSearchVal(value);

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      handleFetchMovies(value);
    }, 1000);

    return setTimer(newTimer);
  }

  function handleSearchData(data: IMovie[]): IMovieOption[] {
    return data?.map((movie: IMovie) => ({
      key: movie.id,
      value: searchVal,
      label: <SearchItem movie={movie} />,
    }));
  }

  useEffect(() => {
    if (searchVal === "") {
      if (top10Movies) {
        setOptions(handleSearchData(top10Movies));
      }
    } else if (moviesData) {
      setOptions(handleSearchData(moviesData));
    }
  }, [moviesData, searchVal, query, top10Movies]);

  return (
    <>
      <AutoComplete
        options={options}
        allowClear
        onSelect={() => setIsSearchOpen(false)}
        listHeight={500}
        open={isSearchOpen}
        onBlur={() => setIsSearchOpen(false)}
        onClear={() => {
          setSearchVal('');
          setOptions(handleSearchData(top10Movies))
        }}
        dropdownRender={(menu) => (
          <div>
            {searchVal === "" && <span>Входит в топ 10 за месяц</span>}
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
