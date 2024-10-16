export function formatReleaseYear(film) {
	if (film?.type?.includes("series")) {
		const releasePeriod = film.releaseYears?.[0];

		if (releasePeriod && releasePeriod.start != null) {
			return `${releasePeriod.start} - ${releasePeriod.end || "..."}`;
		}
	}

	return film.year || "";
}
