import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { CategoryList } from "../CategoryList";
import { Footer } from "../Footer";
import { HeaderWrapper } from "../HeaderWrapper";
import { MainPage } from "../MainPage";
import { PageNotFound } from "../PageNotFound";
import { RandomMovie } from "../RandomMovie";
import { SelectedMovie } from "../SelectedMovie";
import "./kinopoiskWrapper.css";

export function KinopoiskWrapper() {
	const user = useSelector((state) => state.user.user);

	return (
		<>
			<HeaderWrapper />
			<section className='mainSection'>
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/section/:sectionHeader/:searchType' element={<CategoryList />} />
					<Route path='/about/:id' element={<SelectedMovie />} />
					{user?.loggedIn && <Route path='/random/' element={<RandomMovie />} />}
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</section>
			<Footer />
		</>
	);
}
