import { ConfigProvider, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createMenuData } from "../../HelperFunctions/createMenuData";
import { useFetchListQuery } from "../../redux/kinopoiskApi";
import { MovieListItem } from "../MovieListItem/MovieListItem";
import { SelectComponent } from "../SelectComponent/SelectComponent";
import "./categoryList.css";

export function CategoryList() {
	const [movies, setMovies] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [filterParams, setFilterParams] = useState(null);
	const { sectionHeader, searchType } = useParams();
	const headerHeight = useSelector((state) => state.header.height);
	
	const {
		data: moviesData,
		loading: moviesLoading,
		error: moviesError,
	} = useFetchListQuery({ type: searchType, resultAmount: 100, top: ["top250", "top10"].includes(searchType) && searchType });
console.log(searchType);

	useEffect(() => {
		document.title = `${sectionHeader} - смотреть онлайн в хорошем качестве`;
	}, []);

	useEffect(() => {
		if (moviesData) {
			setFilterParams(createMenuData(moviesData?.docs));
			setMovies(moviesData?.docs);
		} else {
			setMovies([]);
		}
	}, [moviesData]);

	function handlePageChange(page, size) {
		setCurrentPage(page);
		setPageSize(size);
	}

	const moviesItems = movies.slice((currentPage - 1) * pageSize, currentPage * pageSize);

	const customLocale = {
		Pagination: {
			items_per_page: "/ на странице",
			jump_to: "Перейти на",
			jump_to_confirm: "подтвердить",
			page: "страницу",
		},
	};

	return (
		<div className='categoryList-wrapper'>
			{moviesLoading && <div>Загрузка...</div>}
			{moviesError && <div>Ошибка: {moviesError}</div>}

			<h3 className='categoryList-title'>{sectionHeader}</h3>

			<div className='categoryList-contentWrapper'>
				<div className='categoryList-paginationAndList'>
					<ConfigProvider
						locale={customLocale}
						theme={{
							token: {
								colorPrimary: "orange",
								colorText: "white",
								colorBgBase: "#131317",
								colorBgTextHover: "orange",
							},
						}}
					>
						<Pagination
							current={currentPage}
							total={movies.length}
							showSizeChanger
							showQuickJumper
							pageSize={pageSize}
							pageSizeOptions={[10, 20, 50]}
							onChange={handlePageChange}
							onShowSizeChange={(size) => {
								handlePageChange(1, size);
							}}
						/>

						<ul className='categoryList-moviesList'>
							{moviesItems.length > 0 ? (
								moviesItems.map((movie) => (
									<MovieListItem
										key={movie.id}
										movie={movie}
									/>
								))
							) : (
								<li>Фильмы не найдены</li>
							)}
						</ul>
						<Pagination
							current={currentPage}
							total={movies.length}
							showSizeChanger
							showQuickJumper
							pageSize={pageSize}
							pageSizeOptions={[10, 20, 50]}
							onChange={handlePageChange}
							onShowSizeChange={(size) => {
								handlePageChange(1, size);
							}}
						/>
					</ConfigProvider>
				</div>
				<div
					style={{ top: headerHeight + "px" }}
					className='categoryList-filter'
				>
					<SelectComponent
						filterParams={filterParams}
						fetchedMovies={moviesData?.docs || []}
						setMovies={setMovies}
					/>
				</div>
			</div>
		</div>
	);
}
