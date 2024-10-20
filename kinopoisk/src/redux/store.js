import { configureStore } from "@reduxjs/toolkit";
import { footerReducer } from "./footerSlice";
import { headerReducer } from "./headerSlice";
import { kinopoiskApi, kinopoiskApiReducer } from "./kinopoiskApi";
import { userReducer } from "./userSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		header: headerReducer,
		footer: footerReducer,
		kinopoiskApi: kinopoiskApiReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(kinopoiskApi.middleware),
});
