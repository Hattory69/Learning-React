export function formatReleaseYear(Movie) {
	if (Movie?.type?.includes("series")) {
		const releasePeriod = Movie.releaseYears?.[0];

		if (releasePeriod && releasePeriod.start != null) {
			return `${releasePeriod.start} - ${releasePeriod.end || "..."}`;
		}
	}

	return Movie.year || "";
}
