import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "~redux/userSlice";
import { RootState } from "~redux/store";
import { KinopoiskWrapper } from "~components/KinopoiskWrapper";

export function AppContextWrapper() {
	const user = useSelector((state: RootState) => state.user.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			localStorage.setItem("registrationData", JSON.stringify(user));
		}
	}, [user]);

	return <KinopoiskWrapper />;
}
