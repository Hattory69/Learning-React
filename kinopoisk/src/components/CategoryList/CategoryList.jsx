import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Pagination } from "antd";
import React, { useEffect, useState } from "react";
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
	const [showFilters, setShowFilters] = useState(false);
	const [filterParams, setFilterParams] = useState(null);
	const { sectionHeader, searchType } = useParams();
	const [customLocale, setCustomLocale] = useState({
		Pagination: {
			items_per_page: "/ на странице",
		},
	});

	const {
		data: moviesData,
		loading: moviesLoading,
		error: moviesError,
	} = useFetchListQuery({ type: searchType, resultAmount: 100, top: ["top250", "top10"].includes(searchType) && searchType });

	useEffect(() => {
		document.title = `${sectionHeader} - смотреть онлайн в хорошем качестве`;
	}, [sectionHeader]);

	function handleResize() {
		setCustomLocale((prevLocale) => ({
			...prevLocale,
			Pagination: {
				...prevLocale.Pagination,
				items_per_page: window.innerWidth > 768 ? "/ на странице" : "",
			},
		}));
	}

	useEffect(() => {
		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
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

	return (
		<div className='categoryList-wrapper'>
			{moviesLoading && <div>Загрузка...</div>}
			{moviesError && <div>Ошибка: {moviesError}</div>}

			<h3 className='categoryList-title'>{sectionHeader}</h3>

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
				<div className='categoryList-contentWrapper'>
					<div className='categoryList-paginationAndList'>
						<Pagination
							current={currentPage}
							total={movies.length}
							showSizeChanger
							pageSize={pageSize}
							pageSizeOptions={[10, 20, 50]}
							onChange={handlePageChange}
							onShowSizeChange={(size) => {
								handlePageChange(1, size);
							}}
						/>
						<div className='categoryList-filterWrapper'>
							<Button
								className='categoryList-showFiltersBtn'
								onClick={() => setShowFilters(!showFilters)}
							>
								<span className={`categoryList-filterIcon ${showFilters ? "showFilter" : "hideFilter"}`}>
									{showFilters ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
								</span>
								<span className='categoryList-filterBtnText'>Фильтры</span>
							</Button>

							{showFilters && (
								<div className='categoryList-filter fade-block'>
									<SelectComponent
										filterParams={filterParams}
										fetchedMovies={moviesData?.docs || []}
										setMovies={setMovies}
									/>
								</div>
							)}
						</div>
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
							pageSize={pageSize}
							pageSizeOptions={[10, 20, 50]}
							onChange={handlePageChange}
							onShowSizeChange={(size) => {
								handlePageChange(1, size);
							}}
						/>
					</div>
				</div>
			</ConfigProvider>
		</div>
	);
}
