import { useEffect, useRef } from "react";

export const useFocus = () => {
	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return inputRef;
};
