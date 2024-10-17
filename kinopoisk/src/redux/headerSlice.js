import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	height: 100,
};

export const headerSlice = createSlice({
	name: 'header',
	initialState,
	reducers: {
		setHeaderHeight(state, action) {
			state.height = action.payload;
		},
	},
});

export const { setHeaderHeight } = headerSlice.actions;
export const headerReducer = headerSlice.reducer;
