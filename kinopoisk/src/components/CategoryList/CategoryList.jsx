import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createMenuData } from "../../HelperFunctions/createMenuData";
import { useFetch } from "../../HelperFunctions/useFetch";
import { MovieListItem } from "../MovieListItem/MovieListItem";
import { SelectComponent } from "../SelectComponent/SelectComponent";
import "./categoryList.css";

export function CategoryList() {
	const { loading: movieLoading, error: movieError, data: movieData, handleFetch: loadMovie } = useFetch();
	const [movies, setMovies] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [filterParams, setFilterParams] = useState(null);
	const { sectionHeader, searchType } = useParams();

	useEffect(() => {
		loadMovie(searchType, 100);
	}, []);

	useEffect(() => {
		if (movieData) {
			setFilterParams(createMenuData(movieData));
			setMovies(movieData);
		} else {
			setMovies([]);
		}
	}, [movieData]);

	function handlePageChange(page, size) {
		setCurrentPage(page);
		setPageSize(size);
	}

	const moviesItems = movies.slice((currentPage - 1) * pageSize, currentPage * pageSize);

	return (
		<div>
			{movieLoading && <div>Загрузка...</div>}
			{movieError && <div>Ошибка: {movieError}</div>}

			<h3>{sectionHeader}</h3>

			<div className='categoryList-mainWrapper'>
				<div className='categoryList-paginationAndList'>
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
					<ul className='categoryList-movieList'>
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
				</div>
				<div>
					<SelectComponent
						filterParams={filterParams}
						fetchedMovies={movieData || []}
						setMovies={setMovies}
					/>
				</div>
			</div>
		</div>
	);
}
