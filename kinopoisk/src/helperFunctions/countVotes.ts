export function countVotes(votes: object): number {
  return Object.values(votes ?? {}).reduce((acc, votes) => (acc += votes), 0);
}