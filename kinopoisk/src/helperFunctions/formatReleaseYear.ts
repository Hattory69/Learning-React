import { ReleaseYears } from "~types/types";

export function formatReleaseYear(type: string | null | undefined, releaseYears: ReleaseYears[] | undefined, year: number | null | undefined) {
	if (typeof type === "string" && type.includes("series")) {
		if (Array.isArray(releaseYears) && releaseYears.length > 0) {
			const releaseYear = releaseYears[0];
			return `${releaseYear.start} - ${releaseYear.end || "..."}`;
		}
	}

	return year || "";
}
