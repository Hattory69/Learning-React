import { testData } from "../testData/testData";
import { testListOfSeries } from "../testData/testListOfSeries";
import { testPosters } from "../testData/testPosters";
import { testReviews } from "../testData/testReviews";
import { selectedMovie } from "../testData/testSelectedMovie";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// eslint-disable-next-line no-undef
const apiKey = process.env.TOKEN;

const isTest = true;

export const kinopoiskApi = createApi({
	reducerPath: "kinopoiskApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.kinopoisk.dev/v1.4",
		prepareHeaders: (headers) => {
			headers.set("X-API-KEY", apiKey);
			return headers;
		},
	}),
	endpoints: (builder) => ({
		searchItem: builder.query(
			isTest
				? { queryFn: () => ({ data: testData }) }
				: {
						query: (searchData) => `movie/search?limit=10&notNullFields=externalId.kpHD&query=${encodeURIComponent(searchData)}`,
				  }
		),
		fetchList: builder.query(
			isTest
				? { queryFn: () => ({ data: testData }) }
				: {
						query: ({ type, resultAmount }) => {
							const top = type === "top250" || type === "top10" ? type : "";
							return `movie?page=1&limit=${resultAmount}&notNullFields=externalId.kpHD${top ? `&notNullFields=${top}` : ""}${
								top ? "" : `&type=${type}&rating.kp=7-10`
							}`;
						},
				  }
		),
		fetchMovie: builder.query(
			isTest
				? { queryFn: () => ({ data: selectedMovie }) }
				: {
						query: ({ id }) => `/movie/${id}`,
				  }
		),
		fetchMovieImages: builder.query(
			isTest
				? { queryFn: () => ({ data: testPosters }) }
				: {
						query: ({ id }) => `/image?page=1&limit=10&movieId=${id}`,
				  }
		),
		fetchMovieSeasons: builder.query(
			isTest
				? { queryFn: () => ({ data: testListOfSeries }) }
				: {
						query: ({ id }) => `/season?page=1&movieId=${id}`,
				  }
		),
		fetchMovieReviews: builder.query(
			isTest
				? { queryFn: () => ({ data: testReviews }) }
				: {
						query: ({ id }) => `review?page=1&limit=5&movieId=${id}`,
				  }
		),
		fetchSimilarMovies: builder.query(
			isTest
				? { queryFn: () => ({ data: testData }) }
				: {
						query: ({ genres }) => {
							const genresParams =
								genres?.length > 0 ? genres.map((genre) => `genres.name=${encodeURIComponent(genre.toLowerCase())}`).join("&") : "";
							return `/movie?page=1&limit=10&notNullFields=externalId.kpHD${genresParams ? `&${genresParams}` : ""}`;
						},
				  }
		),
		fetchRandomMovie: builder.query(
			isTest
				? { queryFn: () => ({ data: selectedMovie }) }
				: {
						query: ({ searchData }) => {
							const { year, country, genre, type, production, kpRating } = searchData;
							const yearRange = `${year[0]}-${year[1]}`;
							const countriesParams = country ? "&" + country.map((c) => `countries.name=${encodeURIComponent(c)}`).join("&") : "";
							const genresParams = genre ? "&" + genre.map((g) => `genres.name=${encodeURIComponent(g.toLowerCase())}`).join("&") : "";
							const typeParams = type ? "&" + type.map((type) => `type=${encodeURIComponent(type.toLowerCase())}`).join("&") : "";
							const productionParams = production
								? "&" + production.map((production) => `countries.name=${encodeURIComponent(production)}`).join("&")
								: "";
							const kpRatingParam = kpRating ? "&" + `rating.kp=${kpRating?.toFixed(1)}-10` : "";

							return `/movie/random?year=${yearRange}${countriesParams}${genresParams}${typeParams}${productionParams}${kpRatingParam}`;
						},
				  }
		),
	}),
});

export const {
	useSearchItemQuery,
	useFetchListQuery,
	useFetchMovieQuery,
	useFetchMovieImagesQuery,
	useFetchMovieSeasonsQuery,
	useFetchMovieReviewsQuery,
	useFetchSimilarMoviesQuery,
	useLazyFetchRandomMovieQuery,
} = kinopoiskApi;

export const kinopoiskApiReducer = kinopoiskApi.reducer;
