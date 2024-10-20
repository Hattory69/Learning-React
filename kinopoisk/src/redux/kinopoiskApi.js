import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// eslint-disable-next-line no-undef
const apiKey = process.env.TOKEN;

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
		searchItem: builder.query({
			query: (searchData) => `movie/search?limit=10&notNullFields=externalId.kpH&query=${encodeURIComponent(searchData)}`,
		}),
		fetchList: builder.query({
			query: ({ type, resultAmount }) => {
				const top = type === "top250" || type === "top10" ? type : "";

				return `movie?page=1&limit=${resultAmount}&notNullFields=externalId.kpHD${top ? `&notNullFields=${top}` : ""}${
					top ? "" : `&type=${type}&rating.kp=7-10`
				}`;
			},
		}),
		fetchMovie: builder.query({
			query: ({ id }) => `/movie/${id}`,
		}),
		fetchMovieImages: builder.query({
			query: ({ id }) => `/image?page=1&limit=10&movieId=${id}`,
		}),
		fetchMovieSeasons: builder.query({
			query: ({ id }) => `/season?page=1&movieId=${id}`,
		}),
		fetchMovieReviews: builder.query({
			query: ({ id }) => `/review?page=1&limit=5&notNullFields=review&movieId=${id}`,
		}),
		fetchSimilarMovies: builder.query({
			query: ({ genres }) => {
				const genresParams = genres?.length > 0 ? genres.map((genre) => `genres.name=${encodeURIComponent(genre.toLowerCase())}`).join("&") : "";
				return `/movie?page=1&limit=10&notNullFields=externalId.kpHD${genresParams ? `&${genresParams}` : ""}`;
			},
		}),
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
} = kinopoiskApi;
export const kinopoiskApiReducer = kinopoiskApi.reducer;
