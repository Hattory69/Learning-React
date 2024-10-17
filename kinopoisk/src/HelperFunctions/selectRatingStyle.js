export function selectRatingStyle(rating) {
	if (rating >= 7) {
		return { color: "green" };
	} else if (rating >= 4) {
		return { color: "gray" };
	} else if (rating < 4) {
		return { color: "red" };
	}
	return {};
}
