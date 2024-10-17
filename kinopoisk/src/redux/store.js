import { configureStore } from "@reduxjs/toolkit";
import { footerReducer } from "./footerSlice";
import { headerReducer } from "./headerSlice";
import { userReducer } from "./userSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		header: headerReducer,
		footer: footerReducer,
	},
});
