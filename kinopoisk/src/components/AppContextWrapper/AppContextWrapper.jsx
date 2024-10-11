import React, { createContext, useEffect, useState } from "react";
import { KinopoiskWrapper } from "../KinopoiskWrapper/KinopoiskWrapper";

export const userContext = createContext(null);

export function AppContextWrapper() {
	const [user, setUser] = useState(null);

	function loadUserData() {
		const userData = JSON.parse(localStorage.getItem("registrationData"));
		setUser(userData);
	}

	useEffect(() => {
		loadUserData();
	}, []);

	useEffect(() => {
		if (user) {
			localStorage.setItem("registrationData", JSON.stringify(user));
		}
	}, [user]);

	return (
		<userContext.Provider value={{ user, setUser }}>
			<KinopoiskWrapper />
		</userContext.Provider>
	);
}
