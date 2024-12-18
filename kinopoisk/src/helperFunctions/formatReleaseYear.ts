interface Movie {
	type: string | null;
	year: number | null;
	releaseYears: ReleaseYears[];
}

interface ReleaseYears {
	start: number | null;
	end: number | null;
}

export function formatReleaseYear(movie: Movie) {
	if (movie?.type?.includes("series")) {
		const releasePeriod = movie.releaseYears?.[0];

		if (releasePeriod && releasePeriod.start != null) {
			return `${releasePeriod.start} - ${releasePeriod.end || "..."}`;
		}
	}

	return movie.year || "";
}