import { MIN_SLIDE_WIDTH, SPACE_BETWEEN_SLIDES } from "../data/constants";

export function calcSlidesPerView() {
	const containerWidth = window.innerWidth;
	const maxSlides = Math.floor(containerWidth / (MIN_SLIDE_WIDTH + SPACE_BETWEEN_SLIDES));
	return maxSlides;
}
