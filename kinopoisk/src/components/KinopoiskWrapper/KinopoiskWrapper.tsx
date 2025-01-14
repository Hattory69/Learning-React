import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { CategoryList } from "~components/CategoryList";
import { Footer } from "~components/Footer";
import { HeaderWrapper } from "~components/HeaderWrapper";
import { MainPage } from "~components/MainPage";
import { PageNotFound } from "~components/PageNotFound";
import { RandomMovie } from "~components/RandomMovie";
import { SelectedMovie } from "~components/SelectedMovie";
import { RootState } from "~redux/store";
import "./kinopoiskWrapper.css";

export function KinopoiskWrapper() {
	const user = useSelector((state: RootState) => state.user.user);

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
