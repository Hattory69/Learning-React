import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
	user: User | null;
}

interface User {
	lastName: string;
	firstName: string;
	yearOfBirth: number | string;
	email: string;
	username: string;
	password: string;
	loggedIn: boolean;
	registrationDate: string;
}

const initialState: InitialState = {
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
			const userData = localStorage.getItem("registrationData");
			if (userData) {
				state.user = JSON.parse(userData);
			} else {
				state.user = null;
			}
		},
	},
});

export const { setUser, loadUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
