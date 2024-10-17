import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	height: 220,
};

export const footerSlice = createSlice({
	name: "footer",
	initialState,
	reducers: {
		setFooterHeight(state, action) {
			state.height = action.payload;
		},
	},
});

export const { setFooterHeight } = footerSlice.actions;
export const footerReducer = footerSlice.reducer;
