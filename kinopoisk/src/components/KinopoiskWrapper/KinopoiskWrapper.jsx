import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { userContext } from "../AppContextWrapper/AppContextWrapper";
import { CategoryList } from "../CategoryList/CategoryList";
import { HeaderWrapper } from "../HeaderWrapper/HeaderWrapper";
import { MainPage } from "../MainPage/MainPage";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { RandomFilm } from "../RandomFilm/RandomFilm";
import { SelectedFilm } from "../SelectedFilm/SelectedFilm";

export function KinopoiskWrapper() {
	const { user } = useContext(userContext);
	return (
		<>
			<HeaderWrapper />
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
					// path='/'
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
		</>
	);
}
