export interface IOption {
	value: string;
	label: string;
}

export interface IMovie {
	id: number;
	name: string | null;
	alternativeName: string | null;
	poster?: {
		url: string | null;
	};
	rating: IMovieVotesRatings;
	type: string;
	releaseYears?: ReleaseYears[];
	year: number | null;
	top10: number | null;
	top250: number | null;
	genres?: IMovieGenres[];
	votes: IMovieVotesRatings;
	description?: string;
	countries?: IMovieCountry[];
	sequelsAndPrequels?: IMovie[];
	persons?: IMovieActor[];
	ageRating?: number;
	shortDescription?: string;
}

export interface ReleaseYears {
	start: number | null;
	end: number | null;
}

export interface IMovieGenres {
	name: string;
}

export interface IMovieVotesRatings {
	kp?: number;
	imdb?: number;
	filmCritics?: number;
	russianFilmCritics?: number;
	await?: number;
}

export interface IMovieCountry {
	name: string;
}

export interface ISeries {
	movieId: number;
	enName: string;
	episodes?: ISeriesEpisodes[];
	number: number;
	name: string;
}

export interface ISeriesEpisodes {
	number: number;
	name: string | null;
	enName: string | null;
	airDate: string;
	description: string | null;
}

export interface IMovieActor {
	photo: string;
	name: string | null;
	enName: string | null;
	description: string | null;
	profession: string | null;
	enProfession: string | null;
}

export interface IReview {
	id: number;
	review: string;
	title: string;
	type: string;
	author: string;
	createdAt: string;
	reviewDislikes: number;
	reviewLikes: number;
}
