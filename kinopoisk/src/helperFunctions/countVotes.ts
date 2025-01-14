import { IMovieVotesRatings } from "~types/types";

export function countVotes(votes: IMovieVotesRatings): number {
	return Object.values(votes ?? {}).reduce((acc, votes) => (acc += votes), 0);
}
