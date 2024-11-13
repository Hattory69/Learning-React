import { useCallback, useEffect } from "react";
import { calcSlidesPerView } from "./calcSlidesPerView";

export function useSlidesPerView(setSlidesPerView) {
	const updateSlidesPerView = useCallback(() => {
		setSlidesPerView(calcSlidesPerView());
	}, [setSlidesPerView]);

	useEffect(() => {
		updateSlidesPerView();

		window.addEventListener("resize", updateSlidesPerView);
		return () => window.removeEventListener("resize", updateSlidesPerView);
	}, [updateSlidesPerView]);
}
