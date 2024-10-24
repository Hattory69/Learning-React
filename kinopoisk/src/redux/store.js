import { configureStore } from "@reduxjs/toolkit";
import { kinopoiskApi, kinopoiskApiReducer } from "./kinopoiskApi";
import { userReducer } from "./userSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		kinopoiskApi: kinopoiskApiReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(kinopoiskApi.middleware),
});
