import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setHeaderHeight } from "../../redux/headerSlice";
import { CategoryList } from "../CategoryList/CategoryList";
import { Footer } from "../Footer/Footer";
import { HeaderWrapper } from "../HeaderWrapper/HeaderWrapper";
import { MainPage } from "../MainPage/MainPage";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { RandomFilm } from "../RandomFilm/RandomFilm";
import { SelectedFilm } from "../SelectedFilm/SelectedFilm";
import "./kinopoiskWrapper.css";

export function KinopoiskWrapper() {
	const headerHeight = useSelector((state) => state.header.height);
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();

	useEffect(() => {
		const header = document.getElementsByTagName("header")[0];
		dispatch(setHeaderHeight(header.offsetHeight));
	}, []);

	return (
		<>
			<HeaderWrapper />
			<section
				className='mainSection'
				style={{ marginTop: headerHeight + "px" }}
			>
				<Routes>
					<Route
						path='/'
						element={<MainPage />}
					/>
					<Route
						path='/section/:sectionHeader/:searchType'
						element={<CategoryList />}
					/>
					<Route
						path='/about/:id'
						element={<SelectedFilm />}
					/>
					{user?.loggedIn && (
						<Route
							path='/random/'
							// path='/'
							element={<RandomFilm />}
						/>
					)}
					<Route
						path='*'
						element={<PageNotFound />}
					/>
				</Routes>
			</section>
			<Footer />
		</>
	);
}
