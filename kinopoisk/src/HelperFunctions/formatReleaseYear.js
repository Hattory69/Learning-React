export function formatReleaseYear(movie) {
	if (movie?.type?.includes("series")) {
		const releasePeriod = movie.releaseYears?.[0];

		if (releasePeriod && releasePeriod.start != null) {
			return `${releasePeriod.start} - ${releasePeriod.end || "..."}`;
		}
	}

	return movie.year || "";
}
