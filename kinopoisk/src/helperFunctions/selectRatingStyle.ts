type Rating = number | null;

export function selectRatingStyle(rating: Rating) {
	if (rating === null) return undefined;
	if (rating >= 7) {
		return { color: "green" };
	} else if (rating >= 4) {
		return { color: "gray" };
	} else if (rating < 4) {
		return { color: "red" };
	}
}
