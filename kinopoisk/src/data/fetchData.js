import { selectedMovie } from "../data/selectedMovie";
import { testData } from "../data/testData";
import { testListOfSeries } from "../data/testListOfSeries";
import { testPosters } from "../data/testPosters";

// eslint-disable-next-line no-undef
const apiKey = process.env.TOKEN;

export async function fetchData(searchType, resultAmount, searchData) {
	const testFetches = {
		top10: testData,
		top250: testData,
		topMovies: testData,
		topTVSeries: testData,
		topCartoons: testData,
		topAnime: testData,
		searchItem: testData,
		// itemReviews: ,
		specificItem: selectedMovie,
		seasons: testListOfSeries,
		similarMovies: testData,
		posters: testPosters,
	};

	return testFetches[searchType].docs || testFetches[searchType];

	const fetchRequests = {
		searchItem: `https://api.kinopoisk.dev/v1.4/movie/search?limit=10&notNullFields=externalId.kpH&query=${encodeURIComponent(searchData)}`,
		top10: `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=${resultAmount}&notNullFields=externalId.kpHD&notNullFields=top10`,
		top250: `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=${resultAmount}&notNullFields=externalId.kpHD&notNullFields=top250`,
		topMovies: `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=${resultAmount}&notNullFields=externalId.kpHD&type=movie&rating.kp=7-10`,
		topTVSeries: `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=${resultAmount}&notNullFields=externalId.kpHD&type=tv-series&rating.kp=7-10`,
		topCartoons: `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=${resultAmount}&notNullFields=externalId.kpHD&type=cartoon&rating.kp=7-10`,
		topAnime: `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=${resultAmount}&notNullFields=externalId.kpHD&type=anime&rating.kp=7-10`,
		itemReviews: `https://api.kinopoisk.dev/v1.4/review?page=1&limit=${resultAmount}&notNullFields=review&movieId=${searchData}`,
		specificItem: `https://api.kinopoisk.dev/v1.4/movie/${searchData}`,
		seasons: `https://api.kinopoisk.dev/v1.4/season?page=1&limit=${resultAmount}&movieId=${searchData}`,
		similarMovies: function () {
			const genresParams = searchData?.length > 0 ? searchData.map((data) => `genres.name=${encodeURIComponent(data.toLowerCase())}`).join("&") : "";

			return `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=${resultAmount}&notNullFields=externalId.kpHD${
				genresParams ? `&${genresParams}` : ""
			}`;
		},
		posters: `https://api.kinopoisk.dev/v1.4/image?page=1&limit=10&movieId=${searchData}`,
		randomMovie: function () {
			const { year, country, genre, type, production, kpRating } = searchData;
			const yearRange = `${year[0]}-${year[1]}`;
			const countriesParams = country ? "&" + country.map((c) => `countries.name=${encodeURIComponent(c)}`).join("&") : "";
			const genresParams = genre ? "&" + genre.map((g) => `genres.name=${encodeURIComponent(g.toLowerCase())}`).join("&") : "";
			const typeParams = type ? "&" + type.map((type) => `type=${encodeURIComponent(type.toLowerCase())}`).join("&") : "";
			const productionParams = production ? "&" + production.map((production) => `countries.name=${encodeURIComponent(production)}`).join("&") : "";
			const kpRatingParam = kpRating ? "&" + `rating.kp=${kpRating?.toFixed(1)}-10` : "";

			return `https://api.kinopoisk.dev/v1.4/movie/random?year=${yearRange}${countriesParams}${genresParams}${typeParams}${productionParams}${kpRatingParam}`;
		},
	};

	const fetchUrl = typeof fetchRequests[searchType] === "function" ? fetchRequests[searchType]() : fetchRequests[searchType];
	try {
		const response = await fetch(fetchUrl, {
			headers: {
				"X-API-KEY": apiKey,
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		return data.docs || data;
	} catch (error) {
		console.error("Ошибка:", error);
		throw error;
	}
}
