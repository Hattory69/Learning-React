import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
		},
		loadUser(state) {
			const userData = JSON.parse(localStorage.getItem("registrationData"));
			state.user = userData;
		},
	},
});

export const { setUser, loadUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
